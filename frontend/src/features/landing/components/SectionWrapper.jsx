import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionWrapper provides a consistent layout, spacing, and transition
 * for all landing page sections.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.id - Anchor ID for navigation
 * @param {string} props.className - Additional classes for the section
 * @param {boolean} props.isDark - Whether the section uses the dark theme
 * @param {boolean} props.noPadding - Whether to skip vertical padding
 * @param {Object} props.motionProps - Custom Framer Motion props for entry animation
 */
export function SectionWrapper({
    children,
    id,
    className = '',
    isDark = false,
    noPadding = false,
    motionProps = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
}) {
    return (
        <motion.section
            id={id}
            className={`
        relative w-full overflow-hidden
        ${isDark ? 'dark-section bg-charcoal text-white' : 'bg-white text-charcoal'}
        ${!noPadding ? 'py-20 md:py-32' : ''}
        ${className}
      `}
            {...motionProps}
        >
            <div className="container-custom relative z-10 mx-auto px-6 md:px-12">
                {children}
            </div>

            {/* Subtle section transition glow for dark sections */}
            {isDark && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            )}
        </motion.section>
    );
}
