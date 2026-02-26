'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 overflow-hidden">

            {/* Subtle radial glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[500px] w-[500px] rounded-full bg-foreground/[0.03] blur-3xl" />
            </div>

            {/* Giant 404 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="select-none text-[28vw] font-black leading-none tracking-tighter text-foreground/[0.06]"
                aria-hidden="true"
            >
                404
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute flex flex-col items-center gap-6 text-center"
            >
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/30">
                    Page Not Found
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                    Lost in the void.
                </h1>
                <p className="max-w-sm text-sm leading-relaxed text-foreground/50">
                    The page you&apos;re looking for doesn&apos;t exist or was moved.
                    Let&apos;s get you back home.
                </p>
                <Link
                    href="/"
                    className="mt-2 inline-flex items-center gap-2 rounded-lg border border-foreground/10 bg-foreground/5 px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-foreground/10 hover:border-foreground/20"
                >
                    ← Back to Home
                </Link>
            </motion.div>
        </main>
    );
}
