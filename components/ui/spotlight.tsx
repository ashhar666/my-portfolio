'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface SpotlightProps {
    className?: string;
    size?: number;
}

export const Spotlight = ({ className = '', size = 500 }: SpotlightProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInside, setIsInside] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };

        const onEnter = () => setIsInside(true);
        const onLeave = () => setIsInside(false);

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);

        return () => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
            <motion.div
                className="pointer-events-none absolute rounded-full"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: size,
                    height: size,
                    background: 'radial-gradient(circle, rgba(255,220,50,0.12) 0%, rgba(255,200,0,0.05) 40%, transparent 70%)',
                    willChange: 'transform, opacity',
                }}
                animate={{ opacity: isInside ? 1 : 0 }}
                transition={{ duration: 0.4 }}
            />
        </div>
    );
};
