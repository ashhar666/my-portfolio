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
        const duration = 2800; // Slightly longer for the liquid fill appreciation

        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            const p = Math.min(elapsed / duration, 1);

            // Smoother curve for progress
            const easedP = p === 1 ? 1 : 1 - Math.pow(1 - p, 4);
            setProgress(easedP * 100);

            if (p < 1) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => setPhase('zoom'), 600);
            }
        };

        requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        if (phase === 'zoom') {
            const t = setTimeout(() => {
                setPhase('done');
                onComplete();
            }, 1000);
            return () => clearTimeout(t);
        }
    }, [phase, onComplete]);

    if (phase === 'done') return null;

    return (
        <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#050505] flex items-center justify-center">

            {/* SVG Layer for Masking */}
            <svg width="100%" height="100%" className="absolute inset-0 z-10 p-8 md:p-24 overflow-visible">
                <defs>
                    <mask id="textMask">
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[clamp(2.5rem,10vw,8rem)] font-black tracking-tighter fill-white uppercase"
                        >
                            {NAME}
                        </text>
                    </mask>
                </defs>

                {/* Background Shadow/Outline Layer (Inactive) */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[clamp(2.5rem,10vw,8rem)] font-black tracking-tighter fill-none stroke-white/5 uppercase"
                    strokeWidth="1"
                >
                    {NAME}
                </text>

                {/* Masked Liquid Layer */}
                <g mask="url(#textMask)">
                    <motion.rect
                        x="0"
                        width="100%"
                        fill="white"
                        className="mix-blend-normal"
                        initial={{ height: '0%', y: '100%' }}
                        animate={{
                            height: `${progress}%`,
                            y: `${100 - progress}%`
                        }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />

                    {/* Internal Wave Path Inside Letters */}
                    <motion.g
                        animate={{ x: [0, -720] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{ y: `${100 - progress}%` }}
                        className="translate-y-[-16px]"
                    >
                        <path
                            d="M0,16 Q180,0 360,16 T720,16 T1080,16 T1440,16 T1800,16 V320 H0 Z"
                            className="fill-white"
                        />
                    </motion.g>
                </g>
            </svg>

            {/* Precision Counter (Bottom Right) */}
            <motion.div
                animate={phase === 'zoom' ? { opacity: 0 } : { opacity: 1 }}
                className="absolute bottom-12 right-12 z-20 flex flex-col items-end"
            >
                <div className="text-4xl font-mono text-white/20 tabular-nums font-extralight tracking-tighter">
                    {progress.toFixed(1)}<span className="text-xs ml-1">%</span>
                </div>
                <div className="mt-2 w-32 h-[1px] bg-white/5 relative">
                    <div className="absolute inset-y-0 left-0 bg-white/20" style={{ width: `${progress}%` }} />
                </div>
            </motion.div>

            {/* Portal Zoom Overlay */}
            <motion.div
                className="absolute inset-0 z-30 bg-white pointer-events-none"
                initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                animate={phase === 'zoom' ? { clipPath: 'circle(150% at 50% 50%)' } : { clipPath: 'circle(0% at 50% 50%)' }}
                transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            />

            {/* Transition Final Blur Reveal */}
            <AnimatePresence>
                {phase === 'zoom' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                        animate={{ opacity: 0.1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-40 bg-black pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Custom Styles for masking and alignment */}
            <style dangerouslySetInnerHTML={{
                __html: `
                text {
                    user-select: none;
                    font-family: var(--font-playfair), sans-serif;
                }
            ` }} />
        </div>
    );
};
