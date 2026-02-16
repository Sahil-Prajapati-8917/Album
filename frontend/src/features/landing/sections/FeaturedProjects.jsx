import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjectsConfig } from '../config.js';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProjects() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const projectsRef = useRef(null);

    if (!featuredProjectsConfig.titleRegular && featuredProjectsConfig.projects.length === 0) return null;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header — slide up
            ScrollTrigger.create({
                trigger: headerRef.current,
                start: 'top 85%',
                onEnter: () => {
                    gsap.from(headerRef.current, {
                        y: 60,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out'
                    });
                },
                once: true,
            });

            // Project cards — clip-path reveal + scale + parallax + text stagger
            const projectCards = projectsRef.current?.querySelectorAll('.project-card');
            if (projectCards) {
                projectCards.forEach((card, index) => {
                    const imageWrap = card.querySelector('.project-image-wrap');
                    const img = card.querySelector('.project-image');
                    const content = card.querySelector('.project-content');
                    const textEls = content?.querySelectorAll('.project-text-item');

                    // Alternate clip-path direction: even from left, odd from right
                    const fromClip = index % 2 === 0
                        ? 'inset(0 100% 0 0)'
                        : 'inset(0 0 0 100%)';

                    // Image wrapper — clip-path reveal
                    if (imageWrap) {
                        ScrollTrigger.create({
                            trigger: card,
                            start: 'top 80%',
                            onEnter: () => {
                                // Animate clip-path
                                gsap.fromTo(
                                    imageWrap,
                                    { clipPath: fromClip },
                                    {
                                        clipPath: 'inset(0% 0% 0% 0%)',
                                        duration: 1.4,
                                        ease: 'power4.inOut',
                                    }
                                );
                                // Inner image scale
                                if (img) {
                                    gsap.fromTo(
                                        img,
                                        { scale: 1.35 },
                                        { scale: 1.1, duration: 1.8, ease: 'power3.out' }
                                    );
                                }
                            },
                            once: true,
                        });

                        // Parallax on image (unchanged)
                        if (img) {
                            gsap.fromTo(
                                img,
                                { yPercent: -5 },
                                {
                                    yPercent: 5,
                                    ease: 'none',
                                    scrollTrigger: {
                                        trigger: imageWrap,
                                        start: 'top bottom',
                                        end: 'bottom top',
                                        scrub: 1.5,
                                    },
                                }
                            );
                        }
                    }

                    // Content — staggered text reveal
                    if (content) {
                        ScrollTrigger.create({
                            trigger: card,
                            start: 'top 75%',
                            onEnter: () => {
                                if (textEls && textEls.length) {
                                    gsap.from(textEls, {
                                        y: 50,
                                        opacity: 0,
                                        duration: 0.9,
                                        ease: 'power3.out',
                                        stagger: 0.1,
                                        delay: 0.4,
                                    });
                                }
                            },
                            once: true,
                        });
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 md:py-32 bg-[#F8F8F6]"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
                    <div>
                        {featuredProjectsConfig.subtitle && (
                            <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
                                {featuredProjectsConfig.subtitle}
                            </p>
                        )}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-[#111111] tracking-tight">
                            {featuredProjectsConfig.titleRegular} <span className="font-serif italic font-normal text-[#C6A75E]">{featuredProjectsConfig.titleItalic}</span>
                        </h2>
                    </div>
                    {featuredProjectsConfig.viewAllText && (
                        <a
                            href={featuredProjectsConfig.viewAllHref || '#contact'}
                            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[#111111]/70 hover:text-[#C6A75E] font-body text-sm transition-colors duration-300 group"
                        >
                            {featuredProjectsConfig.viewAllText}
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </a>
                    )}
                </div>

                {/* Projects Grid */}
                <div ref={projectsRef} className="space-y-20 md:space-y-32">
                    {featuredProjectsConfig.projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`project-card grid md:grid-cols-2 gap-8 md:gap-12 items-center 
                                ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`} // Removed incorrect class logic, relying on grid
                        >
                            {/* Image with Viewfinder - Always first in DOM, order changed via CSS grid/flex if needed, but Grid handles it best by default order unless specified */}
                            <div
                                className={`project-image-wrap relative overflow-hidden rounded-lg group cursor-pointer 
                                    ${index % 2 === 1 ? 'md:order-2' : 'order-1'} 
                                    order-1`} // Force order 1 on mobile
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="project-image w-full h-full object-cover will-change-transform"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Viewfinder overlay */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-white/70 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-white" />
                                    <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-white/70 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-white" />
                                    <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-white/70 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-white" />
                                    <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-white/70 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-white" />
                                    {/* Center crosshair */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-px h-6 bg-white/50" />
                                        <div className="w-6 h-px bg-white/50 -mt-3 -ml-[11px]" />
                                    </div>
                                </div>

                                {/* Hover gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content - Order 2 on mobile */}
                            <div className={`project-content 
                                ${index % 2 === 1 ? 'md:order-1 md:text-right' : 'order-2'} 
                                order-2`}>
                                <div className={`project-text-item flex items-center gap-3 mb-4 
                                    ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                                    <span className="text-[#C6A75E] font-body text-sm">{project.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#C6A75E]/50" />
                                    <span className="text-[#111111]/50 font-body text-sm">{project.year}</span>
                                </div>
                                <h3 className="project-text-item text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-[#111111] tracking-tight mb-4">
                                    {project.title}
                                </h3>
                                <p className="project-text-item text-[#111111]/60 font-body text-base md:text-lg leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                {featuredProjectsConfig.viewProjectText && (
                                    <a
                                        href="#contact"
                                        className={`project-text-item inline-flex items-center gap-2 text-[#111111] font-body text-sm border-b border-[#C6A75E]/50 pb-1 hover:border-[#C6A75E] hover:text-[#C6A75E] transition-colors duration-300 group/link 
                                            ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        {featuredProjectsConfig.viewProjectText}
                                        <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
