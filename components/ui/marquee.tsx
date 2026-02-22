'use client';

import React, { forwardRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MarqueeProps {
    children: React.ReactNode;
    direction?: 'left' | 'right';
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
}

const MarqueeRoot = ({ children, direction = 'left', speed = 50, pauseOnHover = true, className }: MarqueeProps) => {
    const controls = useAnimationControls();

    return (
        <div
            className={cn("overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]", className)}
            onMouseEnter={() => pauseOnHover && controls.stop()}
            onMouseLeave={() => pauseOnHover && controls.start({ x: direction === 'left' ? "-50%" : "0%" })}
        >
            <motion.div
                className="flex w-max"
                animate={{ x: direction === 'left' ? "-50%" : "0%" }}
                initial={{ x: direction === 'left' ? "0%" : "-50%" }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <div className="flex shrink-0 items-center justify-around gap-8 px-4">
                    {children}
                </div>
                <div className="flex shrink-0 items-center justify-around gap-8 px-4">
                    {children}
                </div>
                <div className="flex shrink-0 items-center justify-around gap-8 px-4">
                    {children}
                </div>
                <div className="flex shrink-0 items-center justify-around gap-8 px-4">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

const MarqueeItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn("flex-shrink-0 px-8", className)}>
            {children}
        </div>
    );
};

// Exporting as a namespaced component for the requested API style
export const Marquee = {
    Root: MarqueeRoot,
    Item: MarqueeItem,
};
