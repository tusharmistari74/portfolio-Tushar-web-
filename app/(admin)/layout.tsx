import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"; // Admin needs styles too, but might need adjustment if globals moved. 
// Wait, global.css moved to (website). I should probably move globals.css back to app/ root 
// OR import it from ../(website)/globals.css which is ugly.
// Better practice: Keep globals.css in app/ root. 
// I will move it back in a separate step or just adjust import.
// Let's assume I'll move it back to root for shared styles.

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Restricted Access",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] text-white`}
                suppressHydrationWarning
            >
                {children}
            </body>
        </html>
    );
}
