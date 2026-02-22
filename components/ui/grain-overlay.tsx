'use client';

import { useEffect, useRef } from 'react';

/**
 * GrainOverlay — performance-optimised version.
 *
 * Strategy:
 *  1. Generate a small (256×256) grain tile ONCE using an OffscreenCanvas (or
 *     an off-screen <canvas>).
 *  2. Turn that tile into a CSS `background-image` data-URL so it is uploaded
 *     to the GPU once as a texture.
 *  3. CSS `@keyframes` shifts the background-position to fake animated grain —
 *     no JS on every frame, no canvas reads.
 *
 * This replaces the previous approach that called `ctx.createImageData` +
 * `ctx.putImageData` on every rAF tick (~60× per second for a full-screen
 * canvas), which was extremely CPU-intensive.
 */
export const GrainOverlay = () => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = divRef.current;
        if (!el) return;

        // Build a 256×256 noise tile once (off the main thread where possible)
        const size = 256;
        let canvas: HTMLCanvasElement | OffscreenCanvas;
        let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;

        try {
            canvas = new OffscreenCanvas(size, size);
            ctx = (canvas as OffscreenCanvas).getContext('2d') as OffscreenCanvasRenderingContext2D;
        } catch {
            canvas = document.createElement('canvas');
            (canvas as HTMLCanvasElement).width = size;
            (canvas as HTMLCanvasElement).height = size;
            ctx = (canvas as HTMLCanvasElement).getContext('2d');
        }

        if (!ctx) return;

        const imageData = ctx.createImageData(size, size);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const v = (Math.random() * 255) | 0;
            data[i] = v;
            data[i + 1] = v;
            data[i + 2] = v;
            data[i + 3] = (Math.random() * 22) | 0; // subtle alpha ≈ 0–22
        }
        ctx.putImageData(imageData, 0, 0);

        // Convert to data URL (OffscreenCanvas needs convertToBlob, fallback to regular canvas)
        const applyDataUrl = (dataUrl: string) => {
            el.style.backgroundImage = `url(${dataUrl})`;
        };

        if (canvas instanceof OffscreenCanvas) {
            canvas.convertToBlob({ type: 'image/png' }).then(blob => {
                const url = URL.createObjectURL(blob);
                applyDataUrl(url);
                return () => URL.revokeObjectURL(url);
            });
        } else {
            applyDataUrl((canvas as HTMLCanvasElement).toDataURL('image/png'));
        }
    }, []);

    return (
        <div
            ref={divRef}
            className="grain-overlay pointer-events-none fixed inset-0 z-[9990]"
            aria-hidden="true"
            style={{
                opacity: 0.15,
                backgroundRepeat: 'repeat',
                backgroundSize: '256px 256px',
            }}
        />
    );
};
