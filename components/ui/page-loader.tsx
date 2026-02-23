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
        const duration = 2500;

        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            const p = Math.min(elapsed / duration, 1);

            const easedP = p === 1 ? 1 : 1 - Math.pow(1 - p, 4);
            setProgress(easedP * 100);

            if (p < 1) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => setPhase('zoom'), 500);
            }
        };

        requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        if (phase === 'zoom') {
            const t = setTimeout(() => {
                setPhase('done');
                onComplete();
            }, 1200);
            return () => clearTimeout(t);
        }
    }, [phase, onComplete]);

    if (phase === 'done') return null;

    const characters = NAME.split("");

    return (
        <div className="fixed inset-0 z-[9999] overflow-hidden bg-black flex flex-col items-center justify-center font-sans tracking-tighter">

            {/* Top Reveal Panel */}
            <motion.div
                initial={{ y: 0 }}
                animate={phase === 'zoom' ? { y: '-100%' } : { y: 0 }}
                transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
                className="absolute inset-0 z-50 bg-[#0a0a0a] flex items-end justify-center overflow-hidden"
                style={{ height: '50.5%' }}
            >
                <div className="mb-[-1.25em] flex">
                    {characters.map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: i * 0.03,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="text-[clamp(1.5rem,8vw,5rem)] font-black text-white px-[0.02em] whitespace-pre"
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Bottom Reveal Panel */}
            <motion.div
                initial={{ y: 0 }}
                animate={phase === 'zoom' ? { y: '100%' } : { y: 0 }}
                transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
                className="absolute bottom-0 inset-x-0 z-50 bg-[#0a0a0a] flex items-start justify-center overflow-hidden"
                style={{ height: '50%' }}
            >
                <div className="mt-[-1.25em] flex">
                    {characters.map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: "-100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: i * 0.03,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="text-[clamp(1.5rem,8vw,5rem)] font-black text-white px-[0.02em] whitespace-pre"
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Center Line and Counter */}
            <motion.div
                className="relative z-[60] flex flex-col items-center"
                animate={phase === 'zoom' ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-sm font-mono text-white/40 mb-2 uppercase tracking-[0.5em]">
                    Initialising
                </div>
                <div className="text-xl font-light text-white/20 tabular-nums">
                    {Math.round(progress)}%
                </div>
            </motion.div>

            {/* Global Progress Bar (Bottom) */}
            <motion.div
                className="fixed bottom-0 left-0 h-[2px] bg-white/20 z-[70]"
                style={{ width: `${progress}%` }}
                animate={phase === 'zoom' ? { opacity: 0 } : { opacity: 1 }}
            />

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
            ` }} />
        </div>
    );
};
