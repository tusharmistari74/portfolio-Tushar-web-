'use client';

import { motion } from 'framer-motion';

const projects = [
    {
        title: "Legal Service Platform",
        category: "Full Stack System",
        description: "Complete ecosystem with Mobile App (User), Web Portal (Lawyer), and Admin Dashboard. Built with React.js, Flutter, and Firebase.",
        tags: ["React.js", "Flutter", "Firebase", "REST API"],
    },
    {
        title: "Patient Record App",
        category: "Mobile Application",
        description: "Offline-first medical record management for clinics. Features Firebase sync, excel export, and structured data storage.",
        tags: ["Flutter", "Offline-first", "Data Sync", "Excel Export"],
    },
    {
        title: "Web Admin Portals",
        category: "Enterprise Tools",
        description: "Secure, role-based dashboards for business operations. Focus on usability, performance, and clean architecture.",
        tags: ["React.js", "Dashboard", "RBAC", "Performance"],
    },
];

export default function Projects() {
    return (
        <section className="relative w-full min-h-screen z-20 bg-[#121212] py-24 px-8 md:px-20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">Selected Work</h2>
                    <p className="text-xl text-gray-400">Production-ready applications solving real-world problems.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
                        >
                            <div className="mb-4">
                                <span className="text-sm font-medium text-purple-400">{project.category}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-300 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center border-t border-white/10 pt-12">
                    <h3 className="text-2xl font-bold mb-4">Let's connect</h3>
                    <p className="text-gray-400 mb-6">Jalgaon, Maharashtra, India</p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <a href="mailto:tusharmistari782@gmail.com" className="hover:text-purple-400 transition-colors">tusharmistari782@gmail.com</a>
                        <a href="tel:+917768942390" className="hover:text-purple-400 transition-colors">+91-7768942390</a>
                        <a href="https://linkedin.com/in/tushar-mistari" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">LinkedIn</a>
                        <a href="https://github.com/tusharmistari74" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">GitHub</a>
                    </div>
                </div>

            </div>
        </section>
    );
}
