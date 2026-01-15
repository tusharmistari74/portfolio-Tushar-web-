'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const totalFrames = 75;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < totalFrames; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    const indexStr = i.toString().padStart(2, '0');
                    img.src = `/sequence/frame_${indexStr}.webp`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve(); // Verify next frame
                    }
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions if not set
        if (canvas.width !== window.innerWidth) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const img = images[index];

        // Object-fit: cover logic
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        // Map 0-1 to 0-(totalFrames-1)
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoaded, images]);

    return (
        <div ref={containerRef} className="h-[500vh] relative bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                />
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
}
