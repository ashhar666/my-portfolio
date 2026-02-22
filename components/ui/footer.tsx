'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';
import { MagneticText } from './morphing-cursor';



const Footer = () => {
    const exploreLinks = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' },
    ];

    const connectLinks = [
        { icon: FiGithub, href: 'https://github.com/ashhar666', label: 'GitHub' },
        { icon: FiLinkedin, href: 'https://linkedin.com/in/ashharshahan', label: 'LinkedIn' },
        { icon: FiTwitter, href: 'https://x.com/ashharshahan', label: 'Twitter' },
        { icon: FiMail, href: 'mailto:ashharshahan666@gmail.com', label: 'Email' },
    ];

    return (
        <motion.footer
            className="relative overflow-hidden bg-background pt-24 pb-8 px-6 md:px-12 border-t border-foreground/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="mx-auto max-w-7xl">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
                    <div className="max-w-md">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight"
                        >
                            Experience <br /> digital excellence.
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-2 gap-16 md:gap-24">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-6">Explore</h4>
                            <ul className="space-y-4">
                                {exploreLinks.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors group flex items-center gap-2">
                                            {link.label}
                                            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-6">Connect</h4>
                            <ul className="space-y-4">
                                {connectLinks.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors group flex items-center gap-2">
                                            {link.label}
                                            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Massive Branding */}
                <div className="relative mb-12 select-none flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col md:flex-row items-center justify-center gap-x-[40px] leading-[0.8] opacity-90"
                    >
                        <MagneticText
                            text="ASHHAR"
                            hoverText="DESIGN"
                            textClassName="text-[12vw] md:text-[10vw] font-black tracking-tighter"
                            circleSize={300}
                        />
                        <MagneticText
                            text="SHAHAN"
                            hoverText="BUILD"
                            textClassName="text-[12vw] md:text-[10vw] font-black tracking-tighter"
                            circleSize={300}
                        />
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-foreground/5 gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-black tracking-tighter text-foreground uppercase">ASHHAR SHAHAN.</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] md:text-xs font-medium text-foreground/40 uppercase tracking-widest">
                        <span>© {new Date().getFullYear()} ASHHAR SHAHAN</span>
                        <a href="#home" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="#home" className="hover:text-foreground transition-colors">Terms</a>
                        <span className="text-foreground/20 hidden md:inline">|</span>
                        <span className="normal-case tracking-normal">Kerala, India</span>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
