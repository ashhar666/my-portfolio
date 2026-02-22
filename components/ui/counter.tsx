'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
    target: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export const Counter = ({
    target,
    suffix = '',
    prefix = '',
    duration = 1800,
    className = '',
}: CounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [isInView, target, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
};
