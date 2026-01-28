'use client';

import { motion } from 'framer-motion';

const services = [
    {
        title: "Full Stack Web Development",
        description: "End-to-end web applications using Next.js and React. From database design to responsive frontend interfaces.",
        features: ["Custom Web Apps", "Admin Dashboards", "Role-Based Access Control", "API Integration"]
    },
    {
        title: "Mobile App Development",
        description: "Cross-platform mobile applications built with Flutter. Native performance with a single codebase.",
        features: ["Android APKs", "Offline-First Logic", "Firebase Sync", "User Authentication"]
    },
    {
        title: "Enterprise Solutions",
        description: "Scalable software for business operations. Secure portals for management and data visualization.",
        features: ["Data Export (Excel/PDF)", "Secure Auth", "Real-time Updates", "Clean Architecture"]
    }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#121212] pt-32 pb-20 px-8 md:px-20 text-[#ededed]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">What I Do.</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mb-16">
                        Bridging the gap between complex requirements and user-friendly software.
                        Delivering high-quality, production-ready code.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                {service.description}
                            </p>
                            <ul className="space-y-3">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-sm text-gray-300">
                                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
