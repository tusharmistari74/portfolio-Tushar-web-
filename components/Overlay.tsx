'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity1 = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);
    const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.6], [0, 1, 0]);

    const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);
    const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9], [0, 1, 0]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">

            {/* Section 1 */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center">
                <motion.div style={{ y: y1, opacity: opacity1 }}>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">
                        Tushar Mistari
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light">
                        Creative Developer & Full Stack Engineer
                    </p>
                </motion.div>
            </div>

            {/* Section 2 */}
            <div className="absolute top-[130vh] w-full px-8 md:px-20">
                <motion.div
                    style={{ y: y2, opacity: opacity2 }}
                    className="max-w-2xl"
                >
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                        I build digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            experiences.
                        </span>
                    </h2>
                    <p className="mt-6 text-lg text-gray-400 max-w-lg">
                        Specializing in React.js, Next.js, and high-performance applications.
                        Translating complex requirements into seamless, user-centric interfaces.
                    </p>
                </motion.div>
            </div>

            {/* Section 3 */}
            <div className="absolute top-[260vh] w-full px-8 md:px-20 flex justify-end">
                <motion.div
                    style={{ y: y3, opacity: opacity3 }}
                    className="max-w-2xl text-right"
                >
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                        Bridging design <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600">
                            & engineering.
                        </span>
                    </h2>
                    <p className="mt-6 text-lg text-gray-400 ml-auto max-w-lg">
                        From offline-first Android apps to secure web portals.
                        Delivering production-ready systems with clean architecture.
                    </p>
                </motion.div>
            </div>

        </div>
    );
}
