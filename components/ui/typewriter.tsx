'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseMs?: number;
    className?: string;
}

export const Typewriter = ({
    words,
    typingSpeed = 80,
    deletingSpeed = 45,
    pauseMs = 1800,
    className = '',
}: TypewriterProps) => {
    const [displayed, setDisplayed] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const blinkInterval = setInterval(() => setBlink(b => !b), 530);
        return () => clearInterval(blinkInterval);
    }, []);

    useEffect(() => {
        const current = words[wordIndex % words.length];

        if (!isDeleting && displayed === current) {
            const t = setTimeout(() => setIsDeleting(true), pauseMs);
            return () => clearTimeout(t);
        }

        if (isDeleting && displayed === '') {
            const t = setTimeout(() => {
                setIsDeleting(false);
                setWordIndex(i => i + 1);
            }, 500); // Small pause after deletion before starting next word
            return () => clearTimeout(t);
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        const t = setTimeout(() => {
            setDisplayed(isDeleting
                ? current.slice(0, displayed.length - 1)
                : current.slice(0, displayed.length + 1)
            );
        }, speed);

        return () => clearTimeout(t);
    }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

    return (
        <span className={className}>
            {displayed}
            <span
                className="ml-0.5 inline-block w-[2px] h-[1em] bg-current align-middle"
                style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}
            />
        </span>
    );
};
