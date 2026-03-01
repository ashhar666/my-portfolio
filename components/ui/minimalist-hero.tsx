'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Typewriter } from './typewriter-text';
import AnimatedTextCycle from './animated-text-cycle';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
    navLinks: { label: string; href: string }[];
    mainText: string;
    readMoreLink: string;
    imageSrc: string;
    imageAlt: string;
    overlayText: {
        part1: string;
        part2: string;
    };
    socialLinks: { icon: LucideIcon; href: string }[];
    locationText: string;
    className?: string;
    themeToggle?: React.ReactNode;
    typewriterWords?: string[];
    animatedPrefix?: React.ReactNode;
    animatedWords?: string[];
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
        href={href}
        className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
    >
        {children}
    </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
        <Icon className="h-5 w-5" />
    </a>
);

const LogoWithName = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLAnchorElement>(null);

    return (
        <a
            href="#home"
            ref={ref}
            className="flex items-center gap-3 group"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.5 }}
                className="block cursor-pointer focus:outline-none"
                aria-label="Logo"
            >
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-foreground/10 bg-foreground/5 p-1 transition-colors group-hover:border-foreground/20">
                    <Image
                        src="/favicon.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-full w-full object-contain"
                        priority
                    />
                </div>
            </motion.div>

            <motion.span
                initial={{ opacity: 0, x: -10, width: 0 }}
                animate={open
                    ? { opacity: 1, x: 0, width: 'auto' }
                    : { opacity: 0, x: -10, width: 0 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden whitespace-nowrap text-sm font-semibold tracking-widest text-foreground uppercase"
            >
                ASHHAR SHAHAN PK
            </motion.span>
        </a>
    );
};

// The main reusable Hero Section component
export const MinimalistHero = ({
    navLinks,
    mainText,
    readMoreLink,
    imageSrc,
    imageAlt,
    overlayText,
    socialLinks,
    locationText,
    className,
    themeToggle,
    typewriterWords,
    animatedPrefix,
    animatedWords,
}: MinimalistHeroProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu on route-like scroll nav
    const handleMobileNavClick = () => setMobileMenuOpen(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    return (
        <div
            className={cn(
                'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12',
                className
            )}
        >
            {/* Mobile Full-Screen Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-50 flex flex-col bg-background px-8 py-10"
                    >
                        {/* Close Button */}
                        <div className="flex justify-end mb-16">
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center h-10 w-10 rounded-full border border-foreground/10 text-foreground/60 hover:text-foreground transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <nav className="flex flex-col gap-8">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    onClick={handleMobileNavClick}
                                    initial={{ opacity: 0, x: -24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.35, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-4xl font-bold tracking-tight text-foreground/80 hover:text-foreground transition-colors"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </nav>

                        {/* Social links at bottom */}
                        <div className="mt-auto flex items-center gap-6">
                            {socialLinks.map((link, i) => {
                                const Icon = link.icon;
                                return (
                                    <motion.a
                                        key={i}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                                        className="text-foreground/50 hover:text-foreground transition-colors"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="z-30 flex w-full max-w-7xl items-center justify-between">
                <LogoWithName />
                <div className="hidden items-center space-x-8 md:flex">
                    {navLinks.map((link) => (
                        <NavLink key={link.label} href={link.href}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    {themeToggle}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => setMobileMenuOpen(true)}
                        className="flex flex-col space-y-1.5 md:hidden"
                        aria-label="Open menu"
                    >
                        <span className="block h-0.5 w-6 bg-foreground"></span>
                        <span className="block h-0.5 w-6 bg-foreground"></span>
                        <span className="block h-0.5 w-5 bg-foreground"></span>
                    </motion.button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
                {/* Left Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="z-20 order-2 md:order-1 text-center md:text-left"
                >
                    <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">{mainText}</p>
                    <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font">
                        Read More
                    </a>
                </motion.div>

                {/* Center Image with Circle */}
                <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="absolute z-0 h-[300px] w-[300px] rounded-full bg-yellow-400/90 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
                    ></motion.div>
                    <motion.img
                        src={imageSrc}
                        alt={imageAlt}
                        className="relative z-10 h-auto w-56 object-cover md:w-64 scale-150 lg:w-72"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                        }}
                    />
                </div>

                {/* Right Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
                >
                    <h1 className={cn(
                        "font-extrabold text-foreground tracking-tighter",
                        (typewriterWords || animatedWords)
                            ? "text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
                            : "text-7xl md:text-8xl lg:text-9xl leading-[0.95]"
                    )}>
                        {animatedWords ? (
                            <>
                                {animatedPrefix && (
                                    <span className="inline-block mr-3 mb-2">{animatedPrefix}</span>
                                )}
                                <AnimatedTextCycle
                                    words={animatedWords}
                                    interval={2500}
                                />
                            </>
                        ) : typewriterWords ? (
                            <Typewriter
                                text={typewriterWords}
                                loop={true}
                                className="inline-block whitespace-pre-wrap"
                            />
                        ) : (
                            <>
                                {overlayText.part1}
                                <br />
                                {overlayText.part2}
                            </>
                        )}
                    </h1>
                </motion.div>
            </div>

            {/* Footer Elements */}
            <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex items-center space-x-4"
                >
                    {socialLinks.map((link, index) => (
                        <SocialIcon key={index} href={link.href} icon={link.icon} />
                    ))}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-sm font-medium text-foreground/80"
                >
                    {locationText}
                </motion.div>
            </footer>
        </div>
    );
};
