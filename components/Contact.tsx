'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
    return (
        <section id="contact" className="relative w-full py-32 px-8 md:px-20 bg-[#121212] overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                >
                    Let's Build Something <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        That Works.
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
                >
                    If you're building in AI, SaaS, or creative tech, let's collaborate.
                    From MVPs to full-scale products.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <a
                        href="https://wa.me/917768942390"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                    >
                        <FaWhatsapp className="text-xl" />
                        Let's Collaborate
                    </a>
                </motion.div>

                <div className="mt-24 flex justify-center gap-8 md:gap-12">
                    {[
                        { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/tushar-mistari-1a363a340' },
                        { name: 'GitHub', icon: FaGithub, href: 'https://github.com/tusharmistari74' },
                        { name: 'Email', icon: FaEnvelope, href: 'mailto:tusharmistari782@gmail.com' },
                    ].map((social, index) => (
                        <motion.a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors"
                        >
                            <social.icon className="text-2xl" />
                            <span className="text-sm font-medium">{social.name}</span>
                        </motion.a>
                    ))}
                </div>

                <div className="mt-24 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
                    © {new Date().getFullYear()} Tushar Mistari. All rights reserved.
                </div>

            </div>
        </section>
    );
}
