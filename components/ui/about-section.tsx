'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import {
    SiPython, SiDjango, SiReact,
    SiPostgresql, SiNextdotjs, SiTypescript,
    SiTailwindcss, SiHtml5, SiCss3
} from 'react-icons/si';
import {
    IoLogoGithub, IoLogoJavascript
} from 'react-icons/io5';
import { MagneticButton } from './magnetic-button';
import { Counter } from './counter';
import { Marquee } from './marquee';

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
};

const lineVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};



const stats = [
    { label: 'Months Experience', value: 6, suffix: '' },
    { label: 'Projects Built', value: 3, suffix: '' },
    { label: 'Technologies', value: 10, suffix: '+' },
];

const AboutSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end end'] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });



    const marqueeSkills = [
        { icon: IoLogoGithub, label: "GitHub" },
        { icon: IoLogoJavascript, label: "JavaScript" },
        { icon: SiPython, label: "Python" },
        { icon: SiDjango, label: "Django" },
        { icon: SiReact, label: "React" },
        { icon: SiHtml5, label: "HTML5" },
        { icon: SiCss3, label: "CSS3" },
        { icon: SiNextdotjs, label: "Next.js" },
        { icon: SiPostgresql, label: "PostgreSQL" },
        { icon: SiTailwindcss, label: "Tailwind" },
    ];

    const bioLines = [
        <>I don’t just build websites — I craft <strong className="text-foreground">digital experiences</strong>.</>,
        <>I’m a <span className="text-foreground font-semibold">Python Full Stack Developer</span> driven by the challenge of turning complex ideas into elegant, high-performance applications. My passion lies in creating systems that are not only visually engaging but also scalable, efficient, and built with purpose.</>,
        <>With a strong foundation in both frontend and backend development, I enjoy working across the entire development lifecycle — from concept and design to deployment and optimization. Whether it’s developing robust APIs, designing responsive interfaces, or solving performance challenges, I approach every project with precision and curiosity.</>,
        <>Technology evolves fast, and so do I. I’m constantly learning, experimenting, and refining my skills to stay ahead — because <strong>great developers never stop growing.</strong></>,
        <>What sets me apart is my mindset: I focus on clean architecture, user-centered design, and solutions that create real impact.</>,
    ];

    return (
        <section ref={sectionRef} id="about" className="relative min-h-screen bg-background px-6 py-32 md:px-12 md:py-40">

            <div className="mx-auto max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
                    <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/40">About</h2>
                </motion.div>

                <div className="grid gap-16 md:grid-cols-[200px_1fr]">
                    {/* Avatar */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                        <motion.div className="h-[200px] w-[200px] overflow-hidden rounded-full cursor-pointer" style={{ filter: 'grayscale(100%)' }} whileHover={{ filter: 'grayscale(0%)', scale: 1.05 }} transition={{ duration: 0.5 }}>
                            <Image src="/profile.png" alt="ASHHAR SHAHAN" width={200} height={200} className="h-full w-full object-cover" />
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-8">
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <h3 className="mb-2 text-2xl font-semibold text-foreground md:text-3xl">ASHHAR SHAHAN</h3>
                            <p className="text-base text-foreground/60">Python Full Stack Developer · Kerala, India</p>
                        </motion.div>

                        {/* Animated counters */}
                        <motion.div
                            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-lg bg-foreground/5 p-3 text-center">
                                    <div className="text-2xl font-bold text-foreground">
                                        <Counter target={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="mt-1 text-[10px] uppercase tracking-wider text-foreground/40">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Bio — staggered lines */}
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6 text-[15px] leading-relaxed text-foreground/70">
                            {bioLines.map((line, i) => (
                                <motion.p key={i} variants={lineVariants}>{line}</motion.p>
                            ))}
                        </motion.div>

                        {/* My Vision Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative mt-12 overflow-hidden rounded-2xl bg-foreground/[0.03] p-8 md:p-10 border border-foreground/[0.05]"
                        >
                            <div className="relative z-10">
                                <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground/40">My Vision</h4>
                                <p className="text-xl font-medium italic text-foreground md:text-2xl leading-tight">
                                    &ldquo;To build technology that doesn’t just work — but inspires.&rdquo;
                                </p>
                            </div>
                            {/* Decorative accent */}
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-foreground/[0.02] blur-2xl" />
                        </motion.div>
                    </div>
                </div>

                {/* Skills - Icon Marquee (Contained) */}
                <div className="overflow-hidden py-12 my-8">
                    <motion.h4
                        className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/30"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Tech Stack
                    </motion.h4>

                    <Marquee.Root speed={30} className="py-2">
                        {marqueeSkills.map((item, i) => (
                            <Marquee.Item key={i} className="px-8">
                                <div className="group relative flex flex-col items-center justify-center gap-3">
                                    <item.icon
                                        size="2.2rem"
                                        aria-label={item.label}
                                        className="text-foreground opacity-40 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
                                    />
                                    <span className="text-[9px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap tracking-widest uppercase font-bold text-foreground/30">
                                        {item.label}
                                    </span>
                                </div>
                            </Marquee.Item>
                        ))}
                    </Marquee.Root>
                </div>

                <div className="grid gap-16 md:grid-cols-[200px_1fr]">
                    <div className="hidden md:block" /> {/* Empty spacer for the grid */}
                    <div className="space-y-8">
                        {/* CTA — Magnetic buttons */}
                        <motion.div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:gap-6" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
                            <MagneticButton
                                as="a"
                                href="#contact"
                                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-foreground/60"
                            >
                                <span>Get in touch</span>
                                <span>→</span>
                            </MagneticButton>

                            <MagneticButton
                                as="a"
                                href="/resume.pdf"
                                download="ASHHAR_SHAHAN_Resume.pdf"
                                className="inline-flex items-center gap-2 rounded-lg bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-foreground/10"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Download Resume</span>
                            </MagneticButton>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
