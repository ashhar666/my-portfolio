'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_lm7ft8q';
const TEMPLATE_ID = 'template_7aoqbcn';
const PUBLIC_KEY = 'LD0VidOaq2EdVumLe';

type Status = 'idle' | 'loading' | 'success' | 'error';

const fieldVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            delay: i * 0.1,
            ease: 'easeOut' as const,
        }
    })
};

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<Status>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    name: formData.name,        // {{name}} in body
                    from_name: formData.name,   // From Name field
                    from_email: formData.email, // From Email field
                    email: formData.email,      // {{email}} Reply To
                    message: formData.message,  // {{message}} in body
                    title: 'Portfolio Contact', // {{title}} in subject
                },
                PUBLIC_KEY
            );
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('EmailJS error:', error);
            setStatus('error');
        }

        setTimeout(() => setStatus('idle'), 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactMethods = [
        {
            icon: FiMail,
            label: 'Email',
            value: 'ashharshahan666@gmail.com',
            href: 'mailto:ashharshahan666@gmail.com'
        },
        {
            icon: FiLinkedin,
            label: 'LinkedIn',
            value: '/ashharshahan',
            href: 'https://linkedin.com/in/ashharshahan'
        },
        {
            icon: FiGithub,
            label: 'GitHub',
            value: '@ashhar666',
            href: 'https://github.com/ashhar666'
        },
        {
            icon: FiTwitter,
            label: 'Twitter',
            value: '@ashharshahan',
            href: 'https://x.com/ashharshahan'
        }
    ];

    return (
        <section
            id="contact"
            className="min-h-screen bg-background px-6 py-32 md:px-12 md:py-40"
        >
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/40">
                        Contact
                    </h2>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Left - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2"
                    >
                        <h3 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
                            Let&apos;s Connect
                        </h3>
                        <p className="mb-8 text-sm leading-relaxed text-foreground/60">
                            Have a project in mind or just want to chat? Feel free to reach out.
                            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                        </p>

                        {/* Contact Methods — pulse on entry */}
                        <div className="space-y-4">
                            {contactMethods.map((method, index) => (
                                <motion.a
                                    key={method.label}
                                    href={method.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -24 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.55,
                                        delay: 0.15 + index * 0.12,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    whileHover={{ x: 6 }}
                                    className="group flex items-center gap-4 text-foreground/60 transition-colors hover:text-foreground"
                                >
                                    <motion.div
                                        whileInView={{
                                            boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 12px rgba(255,255,255,0.15)', '0 0 0px rgba(255,255,255,0)'],
                                        }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 0.4 + index * 0.15 }}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 transition-colors group-hover:border-foreground/20 group-hover:bg-foreground/10"
                                    >
                                        <method.icon className="h-5 w-5" />
                                    </motion.div>
                                    <div>
                                        <p className="text-xs text-foreground/40">{method.label}</p>
                                        <p className="text-sm">{method.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <motion.div
                                custom={0}
                                variants={fieldVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <label htmlFor="name" className="mb-2 block text-sm text-foreground/60">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={status === 'loading'}
                                    className="w-full rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder-foreground/30 transition-all focus:border-foreground/30 focus:bg-foreground/10 focus:outline-none focus:ring-1 focus:ring-foreground/10 disabled:opacity-50"
                                    placeholder="Your name"
                                />
                            </motion.div>

                            {/* Email */}
                            <motion.div
                                custom={1}
                                variants={fieldVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <label htmlFor="email" className="mb-2 block text-sm text-foreground/60">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={status === 'loading'}
                                    className="w-full rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder-foreground/30 transition-all focus:border-foreground/30 focus:bg-foreground/10 focus:outline-none focus:ring-1 focus:ring-foreground/10 disabled:opacity-50"
                                    placeholder="your.email@example.com"
                                />
                            </motion.div>

                            {/* Message */}
                            <motion.div
                                custom={2}
                                variants={fieldVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <label htmlFor="message" className="mb-2 block text-sm text-foreground/60">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    disabled={status === 'loading'}
                                    className="w-full resize-none rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder-foreground/30 transition-all focus:border-foreground/30 focus:bg-foreground/10 focus:outline-none focus:ring-1 focus:ring-foreground/10 disabled:opacity-50"
                                    placeholder="Tell me about your project..."
                                />
                            </motion.div>

                            {/* Submit Button + Status */}
                            <motion.div
                                custom={3}
                                variants={fieldVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex flex-col gap-3"
                            >
                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="group inline-flex w-fit items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/10 px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground/30 hover:bg-foreground/20 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <FiLoader className="h-4 w-4 animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="relative z-10">Send Message</span>
                                            <FiSend className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                        </>
                                    )}
                                </motion.button>

                                {/* Feedback Message */}
                                <AnimatePresence>
                                    {status === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-center gap-2 text-sm text-green-500"
                                        >
                                            <FiCheckCircle className="h-4 w-4 shrink-0" />
                                            <span>Message sent! I&apos;ll get back to you soon.</span>
                                        </motion.div>
                                    )}
                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-center gap-2 text-sm text-red-500"
                                        >
                                            <FiAlertCircle className="h-4 w-4 shrink-0" />
                                            <span>Something went wrong. Please try again or email me directly.</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
