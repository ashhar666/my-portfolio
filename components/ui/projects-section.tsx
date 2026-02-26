'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';

// 3D tilt card
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 25 });
    const springY = useSpring(y, { stiffness: 200, damping: 25 });
    const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
    const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const projects = [
    {
        title: 'WedStory Co.',
        description: 'A premium wedding photography and cinematography brand showcase. Features elegant galleries, cinematic storytelling, and a sophisticated aesthetic capturing life\'s most precious moments.',
        tech: ['React', 'Node.js', 'Express', 'Vanilla CSS', 'HTML'],
        image: '/projects/wedstory.png',
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'IndiRoots',
        description: 'A modern travel and tourism platform exploring the heritage of India. Features interactive destination guides, immersive cultural storytelling, and a seamless travel planning experience.',
        tech: ['Vanilla JS', 'Three.js', 'Node.js', 'Vanilla CSS', 'HTML'],
        image: '/projects/indiroots.jpg',
        liveUrl: '#',
        githubUrl: '#',
    },
];

const ProjectsSection = () => {
    return (
        <section id="projects" className="min-h-screen bg-background py-32 md:py-40 overflow-hidden">
            <div className="mx-auto max-w-6xl px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 flex items-end justify-between"
                >
                    <div>
                        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/40">Projects</h2>
                        <h3 className="mt-2 text-3xl font-bold text-foreground">Featured Work</h3>
                    </div>
                </motion.div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{
                                duration: 0.7,
                                delay: (index % 2) * 0.1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            <ProjectCard project={project} index={index} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Extracted Card Component for reuse
interface Project {
    title: string;
    description: string;
    tech: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
}

const ProjectCard = ({ project, index }: { project: Project, index: number }) => (
    <TiltCard className="group relative flex flex-col overflow-hidden rounded-2xl bg-foreground/5 transition-all hover:bg-foreground/[0.07] hover:shadow-2xl hover:shadow-foreground/5">

        {/* Project Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

            {/* Project Number */}
            <div className="absolute left-6 top-6 z-20">
                <span className="text-xs font-mono font-bold tracking-widest text-white/50 bg-black/20 backdrop-blur-md px-2 py-1 rounded">
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>

            {/* Links Overlay */}
            <div className="absolute right-6 top-6 flex gap-3 z-20 opacity-0 transform translate-y-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {project.liveUrl !== '#' && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl hover:bg-white/20 transition-all border border-white/10" onClick={e => e.stopPropagation()}>
                        <FiExternalLink className="h-5 w-5" />
                    </a>
                )}
                {project.githubUrl !== '#' && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl hover:bg-white/20 transition-all border border-white/10" onClick={e => e.stopPropagation()}>
                        <FiGithub className="h-5 w-5" />
                    </a>
                )}
            </div>
        </div>

        <div className="flex flex-col flex-grow space-y-4 p-8 relative z-10">
            <h3 className="text-2xl font-bold text-foreground transition-colors">{project.title}</h3>
            <p className="text-base leading-relaxed text-foreground/60 flex-grow">{project.description}</p>


            <div className="flex items-center gap-2 text-sm font-semibold text-foreground/40 group-hover:text-foreground transition-colors pt-4">
                <span>View project</span>
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </div>
        </div>

        {/* Shimmer Effect */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
        </div>
    </TiltCard>
);

export default ProjectsSection;
