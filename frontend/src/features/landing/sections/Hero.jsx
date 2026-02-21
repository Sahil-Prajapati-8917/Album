import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config.js';
import { ArrowRight, Play, Menu, X } from 'lucide-react'; // Added Menu, X icons

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const modelRef = useRef(null);
    const overlayTextRef = useRef(null);
    const ctaRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (!heroConfig.backgroundText && !heroConfig.heroImage && heroConfig.navLinks.length === 0) return null;

    useEffect(() => {
        // ... (GSAP context remains mostly the same, maybe adjust parallax values for mobile if needed) ...
        const ctx = gsap.context(() => {
            const triggers = [];

            // Parallax effect for main text
            const textTrigger = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    if (textRef.current) {
                        gsap.set(textRef.current, { yPercent: self.progress * 50 });
                    }
                },
            });
            triggers.push(textTrigger);

            // Parallax effect for model
            const modelTrigger = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    if (modelRef.current) {
                        gsap.set(modelRef.current, { yPercent: self.progress * 20 });
                    }
                },
            });
            triggers.push(modelTrigger);

            // Fade out overlay text and CTAs
            const overlayTrigger = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: '30% top',
                scrub: 1,
                onUpdate: (self) => {
                    if (overlayTextRef.current) {
                        gsap.set(overlayTextRef.current, { opacity: 1 - self.progress });
                    }
                    if (ctaRef.current) {
                        gsap.set(ctaRef.current, { opacity: 1 - self.progress });
                    }
                },
            });
            triggers.push(overlayTrigger);

            return () => {
                triggers.forEach((trigger) => trigger.kill());
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#111111]"
        >
            {/* Layer 1: Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#111111] to-[#1a1a1a] opacity-95" />

            {/* Subtle texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Layer 2: Big Background Text - Responsive sizing */}
            <div
                ref={textRef}
                className="absolute inset-0 flex items-center justify-center z-10 will-change-transform"
            >
                <h1 className="text-[22vw] sm:text-[18vw] md:text-[14vw] font-sans font-extrabold text-white/5 tracking-tighter leading-none select-none whitespace-nowrap">
                    {heroConfig.backgroundText}
                </h1>
            </div>

            {/* Layer 3: Hero Model Image (Cutout) - Responsive sizing */}
            {heroConfig.heroImage && (
                <div
                    ref={modelRef}
                    className="absolute inset-0 flex items-end justify-center z-20 will-change-transform"
                >
                    <div className="relative w-[90vw] sm:w-[65vw] md:w-[40vw] lg:w-[32vw] xl:w-[28vw] max-w-[500px]">
                        <img
                            src={heroConfig.heroImage}
                            alt={heroConfig.heroImageAlt}
                            className="w-full h-auto object-contain"
                            loading="eager"
                        />
                        {/* Gradient fade at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-40 bg-gradient-to-t from-[#111111] to-transparent" />
                    </div>
                </div>
            )}

            {/* Layer 4: Overlay Text & CTAs - Responsive positioning and resizing */}
            <div
                ref={overlayTextRef}
                className="absolute bottom-[28%] sm:bottom-[25%] left-6 right-6 md:left-[12%] md:right-auto z-30 will-change-transform max-w-xl text-center md:text-left"
            >
                <p className="font-serif italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 tracking-wide leading-relaxed mb-4 md:mb-6">
                    {heroConfig.overlayText}
                </p>
                <p className="text-white/60 text-xs sm:text-sm md:text-base font-body mb-6 md:mb-8 max-w-md mx-auto md:mx-0">
                    Pixfolio helps photographers create, manage, and deliver premium digital albums with elegance and precision.
                </p>
            </div>

            {/* CTA Buttons - Responsive layout (stack on mobile, row on desk) */}
            <div
                ref={ctaRef}
                className="absolute bottom-[10%] left-6 right-6 md:bottom-[12%] md:left-[12%] md:right-auto z-30 will-change-transform flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
                <Link to="/signup" className="btn-primary flex items-center justify-center gap-2 group w-full sm:w-auto">
                    Create Your Studio
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/demo" className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto">
                    <Play className="w-4 h-4" />
                    View Demo
                </Link>
            </div>

            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between">
                <Link to="/" className="text-white font-sans font-bold text-xl md:text-2xl tracking-tight flex items-center z-50">
                    <span className="text-[#C6A75E]">P</span>
                    {heroConfig.brandName?.slice(1)}
                </Link>

                {/* Desktop Nav */}
                {heroConfig.navLinks.length > 0 && (
                    <div className="hidden md:flex items-center gap-8 text-white/70 text-sm font-body">
                        {heroConfig.navLinks.map((link) => (
                            <a key={link.label} href={link.href} className="hover:text-[#C6A75E] transition-colors duration-300">{link.label}</a>
                        ))}
                        <Link to="/signup" className="btn-primary py-2 px-6 text-sm">Get Started</Link>
                    </div>
                )}

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white z-50 p-2 -mr-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>

                {/* Mobile Menu Overlay */}
                <div
                    className={`fixed inset-0 bg-[#111111] z-40 flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                        }`}
                >
                    {heroConfig.navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-3xl text-white/90 font-serif italic hover:text-[#C6A75E] transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        to="/signup"
                        className="btn-primary py-4 px-10 text-lg mt-4"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Get Started
                    </Link>
                </div>
            </nav>
        </section>
    );
}
