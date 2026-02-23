'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandWrittenTitle } from "@/components/ui/hand-writing-text";

const NAME = 'ASHHAR SHAHAN PK';

type Phase = 'loading' | 'zoom' | 'done';

export const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<Phase>('loading');

    // Loading Progress
    useEffect(() => {
        let startTime: number;
        const duration = 3500; // Longer to appreciate the hand-writing

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

    return (
        <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#050505] flex items-center justify-center font-sans tracking-tighter text-white">

            {/* Top Reveal Panel */}
            <motion.div
                initial={{ y: 0 }}
                animate={phase === 'zoom' ? { y: '-100%' } : { y: 0 }}
                transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
                className="absolute inset-x-0 top-0 z-50 bg-[#050505] overflow-hidden flex items-end justify-center"
                style={{ height: '50.1%' }}
            >
                <div className="mb-[-5.5rem] md:mb-[-10.5rem] pointer-events-none opacity-20">
                    <HandWrittenTitle title={NAME} subtitle="Portfolio v0.1" />
                </div>
            </motion.div>

            {/* Bottom Reveal Panel */}
            <motion.div
                initial={{ y: 0 }}
                animate={phase === 'zoom' ? { y: '100%' } : { y: 0 }}
                transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
                className="absolute inset-x-0 bottom-0 z-50 bg-[#050505] overflow-hidden flex items-start justify-center"
                style={{ height: '50%' }}
            >
                <div className="mt-[-5.5rem] md:mt-[-10.5rem] pointer-events-none opacity-20">
                    <HandWrittenTitle title={NAME} subtitle="Portfolio v0.1" />
                </div>
            </motion.div>

            {/* Main Content (Centered) */}
            <motion.div
                className="relative z-[60] w-full"
                animate={phase === 'zoom' ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <HandWrittenTitle
                    title={NAME}
                    subtitle="Portfolio v0.1"
                />
            </motion.div>

            {/* Global Progress Bar (Bottom) */}
            <motion.div
                className="fixed bottom-0 left-0 h-[1px] bg-white/10 z-[70] origin-left"
                style={{ scaleX: progress / 100 }}
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
