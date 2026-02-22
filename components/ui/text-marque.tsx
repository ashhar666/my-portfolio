'use client';
import { useRef, useEffect, forwardRef, ReactNode } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useAnimationFrame,
    useMotionValue,
} from 'framer-motion';
import { wrap } from '@motionone/utils';
import { cn } from '@/lib/utils';

interface ComponentProps {
    children: ReactNode;
    baseVelocity: number;
    className?: string;
    scrollDependent?: boolean;
    delay?: number;
}

const TextMarquee = forwardRef<HTMLDivElement, ComponentProps>(({
    children,
    baseVelocity = -5,
    className,
    scrollDependent = false,
    delay = 0,
}, ref) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
        clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    const hasStarted = useRef(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            hasStarted.current = true;
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    useAnimationFrame((t, delta) => {
        if (!hasStarted.current) return;

        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (scrollDependent) {
            if (velocityFactor.get() < 0) {
                directionFactor.current = -1;
            } else if (velocityFactor.get() > 0) {
                directionFactor.current = 1;
            }
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div ref={ref} className='overflow-hidden whitespace-nowrap flex flex-nowrap w-full'>
            <motion.div
                className={cn('flex whitespace-nowrap gap-10 flex-nowrap', className)}
                style={{ x }}
            >
                <div className="flex gap-10 px-5">{children}</div>
                <div className="flex gap-10 px-5">{children}</div>
                <div className="flex gap-10 px-5">{children}</div>
                <div className="flex gap-10 px-5">{children}</div>
            </motion.div>
        </div>
    );
});

TextMarquee.displayName = 'TextMarquee';

export default TextMarquee;
