'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../theme-provider';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/60 transition-all hover:border-foreground/20 hover:bg-foreground/10 hover:text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <FiSun className="h-5 w-5" />
            ) : (
                <FiMoon className="h-5 w-5" />
            )}
        </motion.button>
    );
}
