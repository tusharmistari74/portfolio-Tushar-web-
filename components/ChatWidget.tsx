"use client";

import { useState, useEffect, useRef } from "react";
import {
    FaCommentDots,
    FaTimes,
    FaPaperPlane,
    FaRobot,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    doc,
    setDoc
} from "firebase/firestore";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

interface Message {
    id: string;
    text: string;
    sender: "user" | "admin";
    createdAt: any;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
    const [showAuthModal, setShowAuthModal] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Monitor Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setShowAuthModal(false);
            }
        });
        return () => unsubscribe();
    }, []);

    // Listen for messages if logged in
    useEffect(() => {
        if (!user) {
            setMessages([]);
            return;
        }

        const sessionId = user.uid;
        console.log("Subscribing to messages for user:", sessionId);

        // Ensure active_chat doc exists/updates on login
        setDoc(doc(db, "active_chats", sessionId), {
            sessionId,
            userId: user.uid,
            userName: user.displayName || "Anonymous",
            userEmail: user.email,
            lastUpdated: serverTimestamp(),
        }, { merge: true });

        const q = query(
            collection(db, "chats", sessionId, "messages"),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: Message[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            } as Message));
            setMessages(msgs);
            scrollToBottom();
        });

        return () => unsubscribe();
    }, [user]);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleOpenChat = () => {
        setIsOpen(true);
    };

    const handleLogout = async () => {
        await signOut(auth);
        setIsOpen(false);
    };

    const sendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || !user) return;

        const text = input;
        setInput("");
        setStatus("sending");

        try {
            const sessionId = user.uid;

            // 1. Add message to subcollection
            await addDoc(collection(db, "chats", sessionId, "messages"), {
                text,
                sender: "user",
                createdAt: serverTimestamp(),
            });

            // 2. Update summary doc
            await setDoc(doc(db, "active_chats", sessionId), {
                sessionId,
                lastMessage: text,
                lastUpdated: serverTimestamp(),
                unread: true,
                // Update user details just in case they changed
                userName: user.displayName || "Anonymous",
                userEmail: user.email,
            }, { merge: true });

            setStatus("idle");
        } catch (error: any) {
            console.error("Error sending message:", error);
            setStatus("error");
            alert("Failed to send: " + (error?.message || error));
            setInput(text);
        }
    };

    return (
        <>
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onLoginSuccess={() => setIsOpen(true)}
            />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-5 w-80 md:w-96 h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                    <FaRobot className="text-white text-sm" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Portfolio Support</h3>
                                    <div className="flex items-center gap-1">
                                        <span className={`w-2 h-2 rounded-full ${user ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                        <p className="text-xs text-gray-400">
                                            {user ? (user.displayName || user.email?.split('@')[0] || "User") : "Guest"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {user && (
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-400 hover:text-white transition-colors"
                                        title="Sign Out"
                                    >
                                        <FaSignOutAlt />
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        {/* Content Switcher: Auth vs Chat */}
                        {!user ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl">
                                    <FaUser className="text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Login to Chat</h4>
                                    <p className="text-sm text-gray-400">Please sign in to send messages and track your support history.</p>
                                </div>
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
                                >
                                    Sign In / Sign Up
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                    {messages.length === 0 && (
                                        <div className="text-center mt-10 opacity-50">
                                            <p className="text-sm text-gray-400">👋 Hi {user.displayName?.split(" ")[0]}! How can I help you today?</p>
                                        </div>
                                    )}
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === "user"
                                                    ? "bg-blue-600 text-white rounded-br-none"
                                                    : "bg-white/10 text-gray-200 rounded-bl-none"
                                                    }`}
                                            >
                                                {msg.text}
                                                <div className={`text-xs mt-1 opacity-70 ${msg.sender === "user" ? "text-blue-100" : "text-gray-400"
                                                    }`}>
                                                    {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Just now"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-black/40">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Type a message..."
                                            disabled={status === 'sending'}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!input.trim() || status === 'sending'}
                                            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                                        >
                                            <FaPaperPlane className="text-sm" />
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg z-50 hover:shadow-purple-500/20 transition-shadow"
            >
                {isOpen ? <FaTimes className="text-xl" /> : <FaCommentDots className="text-xl" />}
            </motion.button>
        </>
    );
}
