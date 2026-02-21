import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href="#top"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[99] flex h-12 w-12 items-center justify-center rounded-full bg-[#111111]/80 border border-white/10 text-white shadow-xl backdrop-blur-md transition-colors hover:border-[#C6A75E]/50 hover:bg-[#1a1a1a]/90 focus:outline-none focus:ring-2 focus:ring-[#C6A75E] focus:ring-offset-2 focus:ring-offset-[#111]"
                    aria-label="Back to top"
                >
                    <ArrowUp className="w-5 h-5 text-[#C6A75E]" />
                </motion.a>
            )}
        </AnimatePresence>
    );
}
