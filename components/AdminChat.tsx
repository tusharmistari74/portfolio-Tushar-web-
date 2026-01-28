"use client";

import { useState, useEffect, useRef } from "react";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { FaPaperPlane, FaUserShield, FaSignOutAlt, FaCommentDots, FaTrash } from "react-icons/fa";

interface ChatSession {
    sessionId: string;
    lastMessage: string;
    lastUpdated: any;
    unread: boolean;
    userName?: string;
    userEmail?: string;
    userTyping?: boolean;
}

interface Message {
    id: string;
    text: string;
    sender: "user" | "admin";
    createdAt: any;
}

export default function AdminChat() {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeChats, setActiveChats] = useState<ChatSession[]>([]);
    const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [reply, setReply] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auth State Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Fetch Active Chats
    useEffect(() => {
        if (!user) return; // Only fetch if logged in

        const q = query(
            collection(db, "active_chats"),
            orderBy("lastUpdated", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chats: ChatSession[] = snapshot.docs.map(doc => ({
                sessionId: doc.id,
                ...doc.data()
            } as ChatSession));
            setActiveChats(chats);
        });

        return () => unsubscribe();
    }, [user]);

    // Fetch Messages for Selected Chat
    useEffect(() => {
        if (!selectedChat) return;

        const q = query(
            collection(db, "chats", selectedChat.sessionId, "messages"),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: Message[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Message));
            setMessages(msgs);
            scrollToBottom();
        });

        return () => unsubscribe();
    }, [selectedChat]);

    // Mark as read when selecting chat
    const onSelectChat = async (chat: ChatSession) => {
        setSelectedChat(chat);
        if (chat.unread) {
            await updateDoc(doc(db, "active_chats", chat.sessionId), {
                unread: false
            });
        }
    };

    const deleteChat = async (e: React.MouseEvent, sessionId: string) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this chat? This cannot be undone.")) {
            try {
                await deleteDoc(doc(db, "active_chats", sessionId));
                // Optional: delete sub-collection messages too? Firestore doesn't delete subcollections automatically.
                // For now, removing it from the 'active_chats' list is sufficient for the UI.

                if (selectedChat?.sessionId === sessionId) {
                    setSelectedChat(null);
                }
            } catch (error) {
                console.error("Error deleting chat:", error);
                alert("Failed to delete chat.");
            }
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.error(error);
            alert(`Login failed: ${error.code || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setSelectedChat(null);
    };

    const sendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim() || !selectedChat) return;

        const text = reply;
        setReply("");

        try {
            await addDoc(collection(db, "chats", selectedChat.sessionId, "messages"), {
                text,
                sender: "admin",
                createdAt: serverTimestamp(),
            });

            // Update parent doc
            await updateDoc(doc(db, "active_chats", selectedChat.sessionId), {
                lastMessage: text,
                lastUpdated: serverTimestamp(),
                unread: false // Admin reply doesn't make it unread for admin
            });

        } catch (error) {
            console.error("Error sending reply:", error);
            alert("Failed to send reply");
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0a0a0a] text-white">
                <div className="p-8 bg-white/5 border border-white/10 rounded-2xl w-full max-w-md">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl">
                            <FaUserShield />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                        >
                            {loading ? "Logging in..." : "Access Dashboard"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white">
            {/* Sidebar - Chat List */}
            <div className="w-80 border-r border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#121212]">
                    <h2 className="font-bold flex items-center gap-2">
                        <FaUserShield className="text-purple-500" />
                        Admin Panel
                    </h2>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm" title="Log Out">
                        <FaSignOutAlt />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {activeChats.length === 0 ? (
                        <p className="p-4 text-gray-500 text-center text-sm">No active chats</p>
                    ) : (
                        activeChats.map(chat => (
                            <div
                                key={chat.sessionId}
                                onClick={() => onSelectChat(chat)}
                                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors group relative ${selectedChat?.sessionId === chat.sessionId ? "bg-white/10" : ""
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-medium text-white">
                                        {chat.userName || `Visitor ${chat.sessionId.slice(0, 5)}`}
                                    </h3>
                                    {chat.unread && (
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    )}
                                </div>
                                {chat.userEmail && <p className="text-xs text-gray-500 mb-1">{chat.userEmail}</p>}
                                <p className={`text-sm truncate pr-6 ${chat.userTyping ? "text-green-400 italic" : "text-gray-400"}`}>
                                    {chat.userTyping ? "Typing..." : chat.lastMessage}
                                </p>

                                {/* Delete Button - Only visible on hover */}
                                <button
                                    onClick={(e) => deleteChat(e, chat.sessionId)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Delete Chat"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-[#0f0f0f]">
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/10 bg-[#121212]">
                            <h3 className="font-bold">{selectedChat.userName || "Visitor"}</h3>
                            <p className="text-xs text-gray-500">{selectedChat.sessionId}</p>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.sender === "admin"
                                            ? "bg-purple-600 text-white rounded-br-none"
                                            : "bg-white/10 text-gray-200 rounded-bl-none"
                                            }`}
                                    >
                                        {msg.text}
                                        <div className={`text-xs mt-1 font-medium ${msg.sender === "admin" ? "text-purple-200" : "text-gray-400"
                                            }`}>
                                            {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Just now"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={sendReply} className="p-4 border-t border-white/10 bg-[#121212]">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Type a reply..."
                                    className="flex-1 bg-black/40 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!reply.trim()}
                                    className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 disabled:opacity-50"
                                >
                                    <FaPaperPlane className="text-sm" />
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500 opacity-50">
                        <FaCommentDots className="text-6xl mb-4" />
                        <p>Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}
