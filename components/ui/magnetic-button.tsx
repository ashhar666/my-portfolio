'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    as?: 'button' | 'a';
    href?: string;
    onClick?: () => void;
    download?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export const MagneticButton = ({
    children,
    className,
    strength = 0.35,
    as = 'button',
    href,
    onClick,
    download,
    type,
    disabled,
}: MagneticButtonProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 20 });
    const springY = useSpring(y, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const Tag = as === 'a' ? motion.a : motion.button;

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-magnetic
            className="inline-block"
        >
            <Tag
                style={{ x: springX, y: springY }}
                className={className}
                href={href}
                onClick={onClick}
                download={download}
                type={type}
                disabled={disabled}
                whileTap={{ scale: 0.95 }}
            >
                {children}
            </Tag>
        </div>
    );
};
