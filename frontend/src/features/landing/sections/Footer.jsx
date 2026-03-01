import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import { footerConfig } from '../config.js';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    Instagram,
    Twitter,
    Linkedin,
    Mail,
};

export function Footer() {
    const footerRef = useRef(null);
    const logoRef = useRef(null);
    const contentRef = useRef(null);

    if (!footerConfig.logoText && !footerConfig.email && footerConfig.navLinks.length === 0) return null;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Logo — scale up + fade
            ScrollTrigger.create({
                trigger: logoRef.current,
                start: 'top 88%',
                onEnter: () => {
                    gsap.from(logoRef.current, {
                        y: 80,
                        opacity: 0,
                        scale: 0.9,
                        duration: 1.2,
                        ease: 'power3.out'
                    });
                },
                once: true,
            });

            // Content — fade up
            ScrollTrigger.create({
                trigger: contentRef.current,
                start: 'top 88%',
                onEnter: () => {
                    gsap.from(contentRef.current, {
                        y: 40,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                        delay: 0.3
                    });
                },
                once: true,
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            id="contact"
            className="relative w-full bg-white pt-24 md:pt-32 pb-8 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Massive Logo */}
                {footerConfig.logoText && (
                    <div ref={logoRef} className="mb-16 md:mb-24">
                        <svg
                            viewBox="0 0 600 100"
                            className="w-full h-auto max-h-[15vh] sm:max-h-[20vh] md:max-h-[25vh]"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <text
                                x="50%"
                                y="50%"
                                dominantBaseline="middle"
                                textAnchor="middle"
                                className="fill-[#111111] font-sans font-extrabold"
                                style={{
                                    fontSize: '90px',
                                    letterSpacing: '-0.03em',
                                }}
                            >
                                {footerConfig.logoText}
                            </text>
                        </svg>
                    </div>
                )}

                {/* Footer Content */}
                <div ref={contentRef}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
                        {/* Contact Info */}
                        <div>
                            {footerConfig.contactLabel && (
                                <p className="text-[#C6A75E] text-sm font-body  widest mb-4">
                                    {footerConfig.contactLabel}
                                </p>
                            )}
                            {footerConfig.email && (
                                <a
                                    href={`mailto:${footerConfig.email}`}
                                    className="text-xl md:text-2xl font-sans font-semibold text-softblack hover:text-softblack/70 transition-colors duration-300"
                                >
                                    {footerConfig.email}
                                </a>
                            )}
                            {footerConfig.locationText && (
                                <p className="mt-4 text-softblack/60 font-body text-sm whitespace-pre-line">
                                    {footerConfig.locationText}
                                </p>
                            )}
                        </div>

                        {/* Navigation */}
                        {footerConfig.navLinks.length > 0 && (
                            <div>
                                {footerConfig.navigationLabel && (
                                    <p className="text-[#C6A75E] text-sm font-body  widest mb-4">
                                        {footerConfig.navigationLabel}
                                    </p>
                                )}
                                <nav className="space-y-3">
                                    {footerConfig.navLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className="block text-[#111111]/80 hover:text-[#C6A75E] font-body transition-colors duration-300"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}

                        {/* Social Links */}
                        <div>
                            {footerConfig.socialLabel && (
                                <p className="text-[#C6A75E] text-sm font-body  widest mb-4">
                                    {footerConfig.socialLabel}
                                </p>
                            )}
                            {footerConfig.socialLinks.length > 0 && (
                                <div className="flex items-center gap-4">
                                    {footerConfig.socialLinks.map((social) => {
                                        const Icon = iconMap[social.iconName] || Mail;
                                        return (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                aria-label={social.label}
                                                className="w-10 h-10 rounded-full bg-[#F8F8F6] flex items-center justify-center text-[#111111]/70 hover:bg-[#111111] hover:text-[#C6A75E] transition-all duration-300"
                                            >
                                                <Icon className="w-5 h-5" strokeWidth={1.5} />
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                            {footerConfig.tagline && (
                                <p className="mt-6 text-[#111111]/40 font-body text-sm whitespace-pre-line">
                                    {footerConfig.tagline}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-[#C6A75E]/20 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-[#111111]/40 font-body text-sm text-center md:text-left">
                            {footerConfig.copyright || `\u00A9 ${new Date().getFullYear()} All rights reserved.`}
                        </p>
                        {footerConfig.bottomLinks.length > 0 && (
                            <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-[#111111]/40 font-body text-sm">
                                {footerConfig.bottomLinks.map((link) => (
                                    <a key={link.label} href={link.href} className="hover:text-[#C6A75E] transition-colors duration-300">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F8F6] to-transparent pointer-events-none" />
        </footer>
    );
}
