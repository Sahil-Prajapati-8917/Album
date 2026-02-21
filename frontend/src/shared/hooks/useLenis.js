import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis with premium feel settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Keep ScrollTrigger in sync with layout changes (image loading, etc.)
        const resizeObserver = new ResizeObserver(() => {
            ScrollTrigger.refresh();
        });
        resizeObserver.observe(document.body);

        // Robust initial load recalculation
        const handleLoad = () => ScrollTrigger.refresh();
        if (document.readyState === 'complete') {
            requestAnimationFrame(() => ScrollTrigger.refresh());
        } else {
            window.addEventListener('load', handleLoad);
        }

        // Ensure webfonts don't break dimensions
        if (document.fonts) {
            document.fonts.ready.then(() => {
                ScrollTrigger.refresh();
            });
        }

        const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
        const t2 = setTimeout(() => ScrollTrigger.refresh(), 500);
        const t3 = setTimeout(() => ScrollTrigger.refresh(), 1500);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Handle anchor links with smooth scroll
        const handleAnchorClick = (e) => {
            const target = e.target;
            const anchor = target.closest('a');

            if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
                const targetElement = document.querySelector(anchor.hash);
                if (targetElement) {
                    e.preventDefault();
                    lenis.scrollTo(targetElement, {
                        offset: -80,
                        duration: 1.2,
                    });
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            lenis.destroy();
            resizeObserver.disconnect();
            window.removeEventListener('load', handleLoad);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            document.removeEventListener('click', handleAnchorClick);
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, []);

    return lenisRef;
}
