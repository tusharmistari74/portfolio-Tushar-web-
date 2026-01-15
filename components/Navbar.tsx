'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/#contact' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl"
            >
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={clsx(
                                'text-sm font-medium transition-colors relative',
                                isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                            )}
                        >
                            {item.name}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </motion.nav>
        </div>
    );
}
