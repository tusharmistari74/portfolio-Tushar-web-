'use client';

// About Page - Moved to (website) group
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#121212] pt-32 pb-20 px-8 md:px-20 text-[#ededed]">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-12">About Me.</h1>

                    <div className="prose prose-invert prose-lg max-w-none mb-16">
                        <p className="text-2xl text-gray-300 leading-relaxed font-light mb-8">
                            Hands-on Software Developer & Full Stack Engineer with a passion for building robust, production-ready systems.
                        </p>
                        <p className="text-gray-400">
                            I specialize in creating end-to-end solutions, from designing intuitive UIs to architecting secure backends. My experience spans building legal web portals, offline-first medical apps, and high-performance immersive websites. I focus on clean architecture, modular components, and delivering real value through code.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-purple-400">Education</h3>
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-xl font-semibold">Bachelor of Computer Engineering</h4>
                                    <p className="text-gray-400">SSBT’s College of Engineering & Technology, Jalgaon</p>
                                    <p className="text-sm text-gray-500">2023 – 2027 (Current: 6th Semester)</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold">Higher Secondary Certificate (12th)</h4>
                                    <p className="text-gray-400">Adarsh College of Arts & Science</p>
                                    <p className="text-sm text-gray-500">2022 – 2023 (Score: 73.33%)</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-blue-400">Technical Skills</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-medium mb-2 text-white">Frontend</h4>
                                    <p className="text-gray-400">React.js, Next.js, HTML5, CSS3, Tailwind CSS, Framer Motion</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium mb-2 text-white">Mobile</h4>
                                    <p className="text-gray-400">Flutter (Android APKs), WebView Applications</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium mb-2 text-white">Backend & Cloud</h4>
                                    <p className="text-gray-400">Firebase (Auth, Firestore, Storage), REST APIs</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium mb-2 text-white">Tools</h4>
                                    <p className="text-gray-400">Git, GitHub, VS Code, Android Studio</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h3 className="text-2xl font-bold mb-6 text-green-400">Achievements</h3>
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                            <li>Participant and Team Lead at Smart India Hackathon (SIH).</li>
                            <li>Delivered multiple live applications for real-world clients.</li>
                            <li>Built offline-first systems with data sync capabilities.</li>
                        </ul>
                    </div>

                </motion.div>
            </div>
        </main>
    );
}
