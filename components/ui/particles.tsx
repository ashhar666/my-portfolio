'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    alpha: number;
    alphaDir: number;
}

export const Particles = ({ count = 55 }: { count?: number }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -9999, y: -9999 });
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Use willReadFrequently: false for pure drawing (no getImageData)
        const ctx = canvas.getContext('2d', { willReadFrequently: false });
        if (!ctx) return;

        let width = 0;
        let height = 0;

        const resize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            // Only update canvas resolution if it actually changed (avoids GPU re-upload)
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        };
        resize();

        // Debounce resize to avoid thrashing
        let resizeTimer: ReturnType<typeof setTimeout>;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 150);
        };
        window.addEventListener('resize', onResize, { passive: true });

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
        // Listen on window so mouse moves over overlapping elements still register
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        canvas.addEventListener('mouseleave', onMouseLeave);

        // Init particles
        const particles: Particle[] = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -(Math.random() * 0.4 + 0.1),
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.1,
            alphaDir: Math.random() > 0.5 ? 1 : -1,
        }));

        // Pre-compute repulsion threshold squared to avoid sqrt per particle
        const REPEL_RADIUS = 100;
        const REPEL_SQ = REPEL_RADIUS * REPEL_RADIUS;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Use a single fillStyle assignment — path batching reduces state changes
            ctx.fillStyle = 'rgba(255, 220, 80, 1)';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const mx = mouse.current.x;
                const my = mouse.current.y;

                // Squared distance — avoid Math.sqrt unless close enough
                const dx = p.x - mx;
                const dy = p.y - my;
                const distSq = dx * dx + dy * dy;

                if (distSq < REPEL_SQ && distSq > 0) {
                    const dist = Math.sqrt(distSq); // sqrt only when needed
                    const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
                    p.vx += (dx / dist) * force * 0.4;
                    p.vy += (dy / dist) * force * 0.4;
                }

                // Dampen + drift
                p.vx *= 0.97;
                p.vy = p.vy * 0.97 - 0.008;

                p.x += p.vx;
                p.y += p.vy;

                // Pulsing alpha
                p.alpha += 0.004 * p.alphaDir;
                if (p.alpha > 0.6 || p.alpha < 0.05) p.alphaDir *= -1;

                // Wrap
                if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
                if (p.x < -10) p.x = width + 10;
                else if (p.x > width + 10) p.x = -10;

                // Draw — use globalAlpha instead of rebuilding fillStyle string each frame
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mouseleave', onMouseLeave);
            clearTimeout(resizeTimer);
            cancelAnimationFrame(animRef.current);
        };
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
        />
    );
};
