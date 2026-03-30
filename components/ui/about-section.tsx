'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    SiPython, SiDjango, SiReact,
    SiBootstrap, SiSqlite, SiNextdotjs, SiTypescript,
    SiTailwindcss, SiHtml5, SiCss3, SiPostgresql, SiFigma,
} from 'react-icons/si';
import { IoLogoGithub, IoLogoJavascript } from 'react-icons/io5';
import { MagneticButton } from './magnetic-button';
import { Marquee } from './marquee';

/* ─── Data ───────────────────────────────────────────────── */

const skills = [
    { icon: SiPython, name: 'Python', color: '#3776AB' },
    { icon: SiDjango, name: 'Django', color: '#0aad8b' },
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiNextdotjs, name: 'Next.js', color: 'currentColor' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: IoLogoJavascript, name: 'JavaScript', color: '#F7DF1E' },
    { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
    { icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
    { icon: SiCss3, name: 'CSS3', color: '#1572B6' },
    { icon: SiBootstrap, name: 'Bootstrap', color: '#7952B3' },
    { icon: SiSqlite, name: 'SQLite', color: '#44a3cc' },
    { icon: IoLogoGithub, name: 'GitHub', color: 'currentColor' },
    { icon: SiFigma, name: 'Figma', color: '#F75248' },
];

const marqueeSkills = [
    { icon: IoLogoGithub, label: 'GitHub', color: 'currentColor' },
    { icon: IoLogoJavascript, label: 'JavaScript', color: '#F7DF1E' },
    { icon: SiPython, label: 'Python', color: '#3776AB' },
    { icon: SiDjango, label: 'Django', color: '#0aad8b' },
    { icon: SiReact, label: 'React', color: '#61DAFB' },
    { icon: SiHtml5, label: 'HTML5', color: '#E34F26' },
    { icon: SiCss3, label: 'CSS3', color: '#1572B6' },
    { icon: SiNextdotjs, label: 'Next.js', color: 'currentColor' },
    { icon: SiBootstrap, label: 'Bootstrap', color: '#7952B3' },
    { icon: SiSqlite, label: 'SQLite', color: '#44a3cc' },
    { icon: SiTailwindcss, label: 'Tailwind', color: '#06B6D4' },
    { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
];

/* ─── Fade variant ────────────────────────────────────────── */

const rise = {
    hidden: { opacity: 0, y: 20 },
    show: (d: number = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
};

/* ─── Component ──────────────────────────────────────────── */

const AboutSection = () => (
    <section id="about" className="relative bg-background">

        {/* ── Section index bar ── */}
        <div className="border-b border-foreground/[0.07]">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/25">01</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/25">About</span>
            </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">

            {/* ══ TOP SECTION: photo left · text right ══ */}
            <div className="grid gap-0 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">

                {/* ── LEFT: photo column ── */}
                <div className="relative border-b border-foreground/[0.07] pb-10 pt-10 md:border-b-0 md:border-r md:py-20 md:pr-10 lg:py-24">
                    {/* Photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden sm:max-w-[260px] md:mx-0 md:max-w-none"
                    >
                        <motion.div
                            className="h-full w-full"
                            style={{ filter: 'grayscale(1) contrast(1.05)' }}
                            whileHover={{ filter: 'grayscale(0) contrast(1)' }}
                            transition={{ duration: 0.55 }}
                        >
                            <Image
                                src="/profile.webp"
                                alt="Ashhar Shahan"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 260px, 320px"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Identity below photo */}
                    <motion.div
                        custom={0.15}
                        variants={rise}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-6 space-y-2 text-center md:text-left"
                    >
                        <p className="text-sm font-bold tracking-widest text-foreground uppercase">
                            Ashhar Shahan
                        </p>
                        <p className="text-[12px] text-foreground/45 leading-relaxed">
                            Python Full Stack Developer<br />
                            Kerala, India
                        </p>

                        {/* Degree badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-foreground/40">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                            <span className="text-[11px] font-semibold tracking-wider text-foreground/50 uppercase">BCA Graduate</span>
                        </div>

                        {/* Availability */}
                        <div className="inline-flex items-center gap-2 pt-1">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </span>
                            <span className="text-[11px] font-medium text-foreground/50">
                                Available for freelance
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* ── RIGHT: content column ── */}
                <div className="py-10 md:py-20 md:pl-10 lg:py-24">

                    {/* Large statement */}
                    <motion.h2
                        custom={0}
                        variants={rise}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl xl:text-6xl"
                    >
                        I build things<br />
                        <span className="text-foreground/25">people use.</span>
                    </motion.h2>

                    {/* Bio */}
                    <motion.div
                        custom={0.1}
                        variants={rise}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-6 max-w-xl space-y-5 text-[15px] leading-relaxed text-foreground/60 sm:mt-8 sm:space-y-6 md:text-[16px] lg:text-[17px]"
                    >
                        <p>
                            I&apos;m Ashhar — a BCA graduate and full-stack developer from Kerala
                            who gets genuinely excited about hard problems. I don&apos;t just write
                            code that works; I obsess over why it works, how it scales, and
                            whether the person using it actually enjoys it.
                        </p>
                        <p>
                            My stack is Python and Django on the backend, React and Next.js on
                            the front. But honestly? The tools are just vocabulary — the real
                            work is knowing what to say. Clean APIs, fast UIs, databases that
                            don&apos;t collapse under pressure — that&apos;s the standard I hold myself to.
                        </p>
                        <p>
                            I&apos;ve shipped projects for real clients with real deadlines. I know
                            what it&apos;s like to debug at midnight and still deliver on time. If
                            you&apos;re looking for someone who takes ownership — and loses sleep
                            over it — I&apos;m your person.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        custom={0.3}
                        variants={rise}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
                    >
                        <MagneticButton
                            as="a"
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-75"
                        >
                            Let&apos;s work together
                        </MagneticButton>
                        <MagneticButton
                            as="a"
                            href="/resume.pdf"
                            download="ASHHAR_SHAHAN_Resume.pdf"
                            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/50 underline underline-offset-4 decoration-foreground/20 transition-colors hover:text-foreground hover:decoration-foreground/50"
                        >
                            Download Resume
                        </MagneticButton>
                    </motion.div>

                    {/* ══ VISION QUOTE ══ */}
                    <motion.div
                        custom={0.4}
                        variants={rise}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-12 border-l-2 border-foreground/10 pl-5 sm:mt-16 sm:pl-6"
                    >
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30">
                            My Philosophy
                        </p>
                        <blockquote className="text-lg font-medium italic leading-relaxed text-foreground/80 sm:text-xl md:text-2xl">
                            &ldquo;Good software is invisible. You only notice bad software.&rdquo;
                        </blockquote>
                    </motion.div>
                </div>
            </div>
        </div>

        {/* ══ MARQUEE ══ */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="border-t border-foreground/[0.07] py-8"
        >
            <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />
                <Marquee.Root speed={28} className="py-3">
                    {marqueeSkills.map((item, i) => (
                        <Marquee.Item key={i} className="px-8">
                            <div className="group flex flex-col items-center gap-2.5">
                                <item.icon
                                    size="1.75rem"
                                    aria-label={item.label}
                                    style={{ color: item.color }}
                                    className="opacity-40 transition-all duration-400 group-hover:opacity-80 group-hover:scale-110"
                                />
                                <span className="text-[9px] opacity-0 transition-opacity duration-300 group-hover:opacity-60 whitespace-nowrap tracking-widest uppercase font-semibold text-foreground/50">
                                    {item.label}
                                </span>
                            </div>
                        </Marquee.Item>
                    ))}
                </Marquee.Root>
            </div>
        </motion.div>

    </section>
);

export default AboutSection;
