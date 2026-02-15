import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import { pricingConfig } from '../../../main.jsx';

gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header — slide up
            ScrollTrigger.create({
                trigger: headerRef.current,
                start: 'top 85%',
                onEnter: () => {
                    gsap.fromTo(
                        headerRef.current,
                        { y: 60, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
                    );
                },
                once: true,
            });

            // Cards — staggered slide up
            const cards = cardsRef.current?.querySelectorAll('.pricing-card');
            if (cards) {
                ScrollTrigger.create({
                    trigger: cardsRef.current,
                    start: 'top 80%',
                    onEnter: () => {
                        gsap.fromTo(
                            cards,
                            { y: 60, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.9,
                                ease: 'power3.out',
                                stagger: 0.15,
                            }
                        );
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
            id="pricing"
            className="relative w-full py-24 md:py-32 bg-[#F8F8F6]"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-16 md:mb-20 opacity-0">
                    <p className="text-[#C6A75E] text-sm font-body uppercase tracking-widest mb-4">
                        {pricingConfig.subtitle}
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-[#111111] tracking-tight">
                        {pricingConfig.titleRegular} <span className="font-serif italic font-normal text-[#C6A75E]">{pricingConfig.titleItalic}</span>
                    </h2>
                    <p className="mt-6 text-[#111111]/60 font-body text-base md:text-lg max-w-2xl mx-auto">
                        {pricingConfig.description}
                    </p>
                </div>

                {/* Pricing Cards */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {pricingConfig.plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`pricing-card opacity-0 rounded-lg p-8 md:p-10 transition-all duration-500 ${plan.highlighted
                                ? 'bg-[#111111] text-white shadow-2xl scale-100 md:scale-110 border-2 border-[#C6A75E] z-10'
                                : 'bg-white text-[#111111] border border-[#111111]/10 hover:shadow-xl hover:border-[#C6A75E]/30 z-0'
                                }`}
                        >
                            {/* Plan Name */}
                            <div className="mb-6">
                                <h3 className={`text-lg font-sans font-semibold mb-2 ${plan.highlighted ? 'text-[#C6A75E]' : 'text-[#111111]'}`}>
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl md:text-5xl font-sans font-bold ${plan.highlighted ? 'text-white' : 'text-[#111111]'}`}>
                                        {plan.price}
                                    </span>
                                    <span className={`text-sm font-body ${plan.highlighted ? 'text-white/60' : 'text-[#111111]/60'}`}>
                                        {plan.period}
                                    </span>
                                </div>
                                <p className={`mt-3 text-sm font-body ${plan.highlighted ? 'text-white/70' : 'text-[#111111]/60'}`}>
                                    {plan.description}
                                </p>
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-[#C6A75E]' : 'text-[#C6A75E]'}`} strokeWidth={2} />
                                        <span className={`text-sm font-body ${plan.highlighted ? 'text-white/80' : 'text-[#111111]/70'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Link
                                to="/signup"
                                className={`block w-full py-4 rounded-sm font-sans font-semibold text-sm text-center transition-all duration-300 ${plan.highlighted
                                    ? 'bg-[#C6A75E] text-white hover:bg-[#8F6A2A]'
                                    : 'bg-[#111111] text-white hover:bg-[#C6A75E]'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Trust Badge */}
                <div className="mt-16 text-center">
                    <p className="text-[#111111]/40 font-body text-sm">
                        Trusted by 500+ Professional Wedding Studios Worldwide
                    </p>
                </div>
            </div>
        </section>
    );
}
