'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAME = 'ASHHAR SHAHAN PK';

type Phase = 'loading' | 'zoom' | 'done';

export const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<Phase>('loading');

    // Loading Progress
    useEffect(() => {
        let startTime: number;
        const duration = 2000; // Faster, cleaner loading time

        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            const p = Math.min(elapsed / duration, 1);

            // Power-4 easing for a premium feel
            const easedP = p === 1 ? 1 : 1 - Math.pow(1 - p, 4);
            setProgress(easedP * 100);

            if (p < 1) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => setPhase('zoom'), 400);
            }
        };

        requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        if (phase === 'zoom') {
            const t = setTimeout(() => {
                setPhase('done');
                onComplete();
            }, 800);
            return () => clearTimeout(t);
        }
    }, [phase, onComplete]);

    if (phase === 'done') return null;

    return (
        <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#050505] flex items-center justify-center">

            <div className="relative flex flex-col items-center gap-8 w-full max-w-md px-12">
                {/* Center Percentage */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center"
                >
                    <span className="text-sm font-medium uppercase tracking-[0.4em] text-white/30 mb-4">
                        Initialsing
                    </span>
                    <div className="text-7xl md:text-8xl font-thin text-white tabular-nums tracking-tighter">
                        {Math.round(progress)}<span className="text-xl md:text-2xl ml-1 text-white/20">%</span>
                    </div>
                </motion.div>

                {/* Minimal Progress Line */}
                <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-white/40"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />
                </div>

                {/* Subtext info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="flex justify-between w-full text-[10px] font-medium uppercase tracking-widest text-white/20"
                >
                    <span>{NAME}</span>
                    <span>Portfolio v0.1</span>
                </motion.div>
            </div>

            {/* Portal Zoom Overlay (Refined for cleanliness) */}
            <motion.div
                className="absolute inset-0 z-30 bg-white pointer-events-none"
                initial={{ opacity: 0 }}
                animate={phase === 'zoom' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            />

            {/* Transition Final Blur Reveal */}
            <AnimatePresence mode="wait">
                {phase === 'zoom' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        animate={{ opacity: 0.1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-40 bg-black pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;900&display=swap');
                body {
                    font-family: 'Outfit', sans-serif;
                }
            ` }} />
        </div>
    );
};
