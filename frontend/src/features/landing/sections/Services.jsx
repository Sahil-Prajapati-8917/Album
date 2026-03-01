import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Diamond, Users, Sparkles } from 'lucide-react';
import { servicesConfig } from '../config.js';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    Camera,
    Diamond,
    Users,
    Sparkles,
};

export function Services() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const gridRef = useRef(null);

    if (!servicesConfig.titleLine1 && servicesConfig.services.length === 0) return null;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading — slide up
            ScrollTrigger.create({
                trigger: headingRef.current,
                start: 'top 85%',
                onEnter: () => {
                    gsap.from(headingRef.current, {
                        y: 60,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out'
                    });
                },
                once: true,
            });

            // Service cards — staggered slide up
            const cards = gridRef.current?.querySelectorAll('.service-card');
            if (cards) {
                ScrollTrigger.create({
                    trigger: gridRef.current,
                    start: 'top 78%',
                    onEnter: () => {
                        gsap.from(cards, {
                            y: 60,
                            opacity: 0,
                            duration: 0.9,
                            ease: 'power3.out',
                            stagger: 0.12
                        });
                    },
                    once: true,
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="relative w-full py-24 md:py-32 bg-[#111111]"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                    {/* Left Column - Heading */}
                    <div ref={headingRef}>
                        {servicesConfig.subtitle && (
                            <p className="text-[#C6A75E] text-sm font-body  widest mb-4">
                                {servicesConfig.subtitle}
                            </p>
                        )}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tight leading-tight">
                            {servicesConfig.titleLine1}
                            <br />
                            <span className="font-serif italic font-normal text-white">
                                {servicesConfig.titleLine2Italic}
                            </span>
                        </h2>
                        {servicesConfig.description && (
                            <p className="mt-6 text-white/60 font-body text-base md:text-lg max-w-md leading-relaxed">
                                {servicesConfig.description}
                            </p>
                        )}
                    </div>

                    {/* Right Column - Services Grid */}
                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-px bg-white/10">
                        {servicesConfig.services.map((service, index) => {
                            const Icon = iconMap[service.iconName] || Camera;
                            return (
                                <div
                                    key={index}
                                    className="service-card group bg-[#0A0A0A] p-6 md:p-8 flex flex-col h-full transition-all duration-500 hover:bg-[#1A221E] cursor-pointer"
                                >
                                    <div className="mb-6 md:mb-8">
                                        <Icon className="w-7 h-7 text-[#C6A75E] transition-colors duration-300" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-sans font-semibold text-white mb-3 group-hover:text-[#C6A75E] transition-all duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-white/50 font-body leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                                        {service.description}
                                    </p>

                                    {/* Arrow indicator (pushed to bottom) */}
                                    <div className="mt-auto pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <svg
                                            className="w-5 h-5 text-white/80"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
}
