'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorFollower = () => {
    const isHovering = useRef(false);
    const isClicking = useRef(false);
    const visible = useRef(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Dot state (motion values for GPU-composited animation)
    const dotWidth = useMotionValue(6);
    const dotHeight = useMotionValue(6);
    const dotOpacity = useMotionValue(0);

    // Ring state
    const ringWidth = useMotionValue(32);
    const ringHeight = useMotionValue(32);
    const ringOpacity = useMotionValue(0);
    const ringBorderRadius = useMotionValue('50%');

    const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    // Update visual state imperatively — avoids React re-renders on every mouse move
    const updateCursorState = useCallback(() => {
        const clicking = isClicking.current;
        const hovering = isHovering.current;
        const vis = visible.current;

        dotWidth.set(clicking ? 6 : hovering ? 0 : 6);
        dotHeight.set(clicking ? 6 : hovering ? 0 : 6);
        dotOpacity.set(vis ? 1 : 0);

        ringWidth.set(clicking ? 28 : hovering ? 48 : 32);
        ringHeight.set(clicking ? 28 : hovering ? 48 : 32);
        ringOpacity.set(vis ? 1 : 0);
        ringBorderRadius.set(hovering ? '6px' : '50%');
    }, [dotWidth, dotHeight, dotOpacity, ringWidth, ringHeight, ringOpacity, ringBorderRadius]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!visible.current) {
                visible.current = true;
                updateCursorState();
            }
        };

        // Use mousemove + target.closest() instead of mouseover/mouseout
        // mouseover/mouseout fire for every child element crossing — very expensive
        const onMoveHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const hovering = !!(
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[data-magnetic]')
            );
            if (hovering !== isHovering.current) {
                isHovering.current = hovering;
                updateCursorState();
            }
        };

        const onDown = () => { isClicking.current = true; updateCursorState(); };
        const onUp = () => { isClicking.current = false; updateCursorState(); };
        const onLeave = () => { visible.current = false; updateCursorState(); };
        const onEnter = () => { visible.current = true; updateCursorState(); };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mousemove', onMoveHover, { passive: true });
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        document.documentElement.addEventListener('mouseleave', onLeave);
        document.documentElement.addEventListener('mouseenter', onEnter);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousemove', onMoveHover);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.documentElement.removeEventListener('mouseenter', onEnter);
        };
    }, [mouseX, mouseY, updateCursorState]);

    return (
        <>
            {/* Dot — instant, no spring lag */}
            <motion.div
                className="pointer-events-none fixed z-[9999] rounded-full bg-foreground"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: dotWidth,
                    height: dotHeight,
                    opacity: dotOpacity,
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Ring — spring-lagged */}
            <motion.div
                className="pointer-events-none fixed z-[9998] border border-foreground/60"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: ringWidth,
                    height: ringHeight,
                    opacity: ringOpacity,
                    borderRadius: ringBorderRadius,
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
};
