import AdminChat from "@/components/AdminChat";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard - Tushar Portfolio",
    description: "Secure admin area",
};

export default function AdminPage() {
    return <AdminChat />;
}
