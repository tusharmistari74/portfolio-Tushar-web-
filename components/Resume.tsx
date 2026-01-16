"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaDownload } from "react-icons/fa";

const Resume = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 as any } },
    };

    return (
        <section className="py-24 bg-[#121212] text-[#ededed] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
                            Resume
                        </h2>
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                            <h3 className="text-2xl font-semibold text-white">Tushar Mistari</h3>
                            <p>Jalgaon, Maharashtra, India</p>
                            <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
                                <a href="mailto:tusharmistari782@gmail.com" className="flex items-center gap-1 hover:text-blue-400 transition-colors"><FaEnvelope /> tusharmistari782@gmail.com</a>
                                <a href="tel:+917768942390" className="flex items-center gap-1 hover:text-blue-400 transition-colors"><FaPhone /> +91-7768942390</a>
                                <a href="https://linkedin.com/in/tushar-mistari" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition-colors"><FaLinkedin /> LinkedIn</a>
                                <a href="https://github.com/tusharmistari74" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition-colors"><FaGithub /> GitHub</a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Professional Summary */}
                    <motion.div variants={itemVariants} className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h3 className="text-xl font-semibold mb-4 text-blue-400">Professional Summary</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Hands-on Software Developer / Full Stack Developer / React.js Developer with strong practical experience building real-world web applications, Android apps, admin dashboards, and role-based portals. Experienced in end-to-end development including UI/UX design, backend integration, authentication, payments, deployment, and APK delivery. Focused on clean architecture, modular components, performance, and production-ready systems.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Technical Skills */}
                        <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">Technical Skills</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="block text-sm text-gray-400 mb-1">Frontend</span>
                                    <p className="text-gray-200">HTML5, CSS3, JavaScript (ES6+), React.js (Hooks, Component Architecture)</p>
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-400 mb-1">Mobile Development</span>
                                    <p className="text-gray-200">Flutter (Android APKs), WebView-based applications</p>
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-400 mb-1">Backend & Cloud</span>
                                    <p className="text-gray-200">Firebase (Auth, Firestore, Storage), REST API integration</p>
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-400 mb-1">Tools</span>
                                    <p className="text-gray-200">Git, GitHub, VS Code, Android Studio</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Education */}
                        <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">Education</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-medium text-white">Bachelor of Computer Engineering</h4>
                                        <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded">2023 - 2027</span>
                                    </div>
                                    <p className="text-sm text-gray-400">SSBT’s College of Engineering & Technology, Bambhori, Jalgaon</p>
                                    <p className="text-xs text-gray-500 mt-1">Currently in 6th Semester</p>
                                </div>
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-medium text-white">Higher Secondary Certificate (12th)</h4>
                                        <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded">2022 - 2023</span>
                                    </div>
                                    <p className="text-sm text-gray-400">Adarsh College of Arts & Science</p>
                                    <p className="text-xs text-gray-500 mt-1">Score: 73.33%</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Experience */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h3 className="text-2xl font-semibold mb-6 text-blue-400 border-l-4 border-blue-400 pl-4">Experience</h3>
                        <div className="relative border-l border-white/20 ml-3 pl-8 pb-8 space-y-8">
                            <div className="relative">
                                <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full bg-blue-500 border-4 border-[#121212]"></span>
                                <h4 className="text-xl font-bold text-white">Independent / Project-Based Developer</h4>
                                <p className="text-gray-400 text-sm mb-4">Jalgaon, India</p>
                                <ul className="list-disc list-outside text-gray-300 space-y-2 ml-4">
                                    <li>Delivered multiple end-to-end software solutions including mobile apps, web platforms, and admin portals.</li>
                                    <li>Handled full development lifecycle: requirement analysis, UI/UX design, development, testing, and deployment.</li>
                                    <li>Provided clients with complete source code, APKs, and technical documentation.</li>
                                    <li>Maintained focus on clean code practices, scalability, and long-term maintainability.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Projects */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h3 className="text-2xl font-semibold mb-6 text-blue-400 border-l-4 border-blue-400 pl-4">Key Projects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Project 1 */}
                            <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Legal Service Platform</h4>
                                <p className="text-xs text-gray-500 mb-4">React.js, Flutter, Firebase</p>
                                <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
                                    <li>User App, Lawyer Portal & Admin Dashboard.</li>
                                    <li>Feature for profile management, case responses.</li>
                                    <li>Lawyer verification & system monitoring.</li>
                                </ul>
                            </div>
                            {/* Project 2 */}
                            <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Patient Record Management</h4>
                                <p className="text-xs text-gray-500 mb-4">Offline-first, Firebase Sync</p>
                                <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
                                    <li>Offline-first medical record app for clinics.</li>
                                    <li>Structured patient data storage.</li>
                                    <li>Excel export functionality & APK delivery.</li>
                                </ul>
                            </div>
                            {/* Project 3 */}
                            <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Custom Web Admin Portals</h4>
                                <p className="text-xs text-gray-500 mb-4">React.js, RBAC</p>
                                <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
                                    <li>Secure, role-based admin dashboards.</li>
                                    <li>Auth, CRUD operations & real-time updates.</li>
                                    <li>Responsive UI with focus on performance.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Achievements & Soft Skills */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-lg font-semibold mb-4 text-pink-400">Achievements</h3>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Participant and <span className="text-white font-medium">Team Lead at Smart India Hackathon (SIH)</span>.</li>
                                <li>Collaborated on real-world problem statements under time constraints.</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-lg font-semibold mb-4 text-pink-400">Soft Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Problem Solving", "Fast Learner", "Time Management", "Client Handling", "Team Collaboration", "Leadership"].map((skill) => (
                                    <span key={skill} className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300 border border-white/5">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div variants={itemVariants} className="text-center">
                        <motion.a
                            href="/Tushar_Mistari_Resume.pdf"
                            download="Tushar_Mistari_Resume.pdf"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow cursor-pointer"
                        >
                            <FaDownload className="text-lg" /> Download Full Resume
                        </motion.a>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default Resume;
