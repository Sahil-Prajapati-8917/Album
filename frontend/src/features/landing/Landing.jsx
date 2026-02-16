import { useEffect } from 'react';
import { useLenis } from '../../shared/hooks/useLenis';
import { Hero } from './sections/Hero';
import { IntroGrid } from './sections/IntroGrid';
import { Services } from './sections/Services';
import { WhyChooseMe } from './sections/WhyChooseMe';
import { FeaturedProjects } from './sections/FeaturedProjects';
import { Testimonials } from './sections/Testimonials';
import { Pricing } from './sections/Pricing';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import { siteConfig } from './config.js';
import './landing.css';

import { SectionWrapper } from './components/SectionWrapper';

function Landing() {
  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    if (siteConfig.siteTitle) {
      document.title = siteConfig.siteTitle;
    }
    if (siteConfig.siteDescription) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', siteConfig.siteDescription);
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
  }, []);

  return (
    <main className="landing-root bg-white text-charcoal">
      {/* Hero Section - The immersive entrance */}
      <Hero />

      {/* Intro & Showcase - Highlighting the core value */}
      <SectionWrapper id="about">
        <IntroGrid />
      </SectionWrapper>

      {/* Services & Offerings - The premium studio experience */}
      <SectionWrapper id="services" isDark={true}>
        <Services />
      </SectionWrapper>

      {/* Social Proof & Trust - Why clients select Pixfolio */}
      <SectionWrapper id="features">
        <WhyChooseMe />
      </SectionWrapper>

      {/* Portfolio Showcase - Visual excellence in action */}
      <SectionWrapper id="projects" isDark={true}>
        <FeaturedProjects />
      </SectionWrapper>

      {/* Client Voice - Real experiences from top photographers */}
      <SectionWrapper id="testimonials">
        <Testimonials />
      </SectionWrapper>

      {/* Simple Transparent Pricing - The value proposition */}
      <SectionWrapper id="pricing" className="bg-soft-white">
        <Pricing />
      </SectionWrapper>

      {/* Deep Dive & Clarity - Addressing common questions */}
      <SectionWrapper id="faq" isDark={true}>
        <FAQ />
      </SectionWrapper>

      {/* Footer - The lasting impression */}
      <Footer />
    </main>
  );
}

export default Landing;
