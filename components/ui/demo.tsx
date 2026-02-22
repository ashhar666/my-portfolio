import React from 'react';
import { Github, Mail, Instagram, Twitter, Linkedin } from 'lucide-react';
import { MinimalistHero } from './minimalist-hero';
import { ThemeToggle } from './theme-toggle';

const MinimalistHeroDemo = ({ isLoaded = true }: { isLoaded?: boolean }) => {
    const navLinks = [
        { label: 'HOME', href: '#home' },
        { label: 'PRODUCT', href: '#projects' },
        { label: 'STORE', href: '#about' },
        { label: 'ABOUT US', href: '#contact' },
    ];

    const socialLinks = [
        { icon: Github, href: 'https://github.com/ashhar666' },
        { icon: Linkedin, href: 'https://www.linkedin.com/feed/' },
        { icon: Twitter, href: 'https://twitter.com/ashharshahan' },
        { icon: Mail, href: 'mailto:ashharshahan666@gmail.com' },
    ];

    return (
        <MinimalistHero
            navLinks={navLinks}
            mainText="I'm ASHHAR SHAHAN, a dedicated Python Full Stack Developer with a strong focus on designing scalable software solutions, creating intuitive user experiences, and developing high-performance backend systems that solve real-world problems."
            readMoreLink="#about"
            imageSrc="/profile.png"
            imageAlt="A portrait of Ashhar Shahan."
            overlayText={{
                part1: 'less is',
                part2: 'more.',
            }}
            typewriterWords={[
                "less is\nmore.",
                "Design with\npurpose.",
                "Precision over\nperfection."
            ]}
            socialLinks={socialLinks}
            locationText="Kerala, India"
            themeToggle={<ThemeToggle />}
        />
    );
};

export default MinimalistHeroDemo;
