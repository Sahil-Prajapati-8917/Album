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

function Landing() {
  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    if (siteConfig.siteTitle && document.title !== siteConfig.siteTitle) {
      document.title = siteConfig.siteTitle;
    }
    if (siteConfig.siteDescription) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta && meta.getAttribute('content') !== siteConfig.siteDescription) {
        meta.setAttribute('content', siteConfig.siteDescription);
      }
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
  }, []);

  return (
    <main className="landing-root relative w-full overflow-x-hidden">
      {/* Hero Section - Parallax Layering */}
      <Hero />

      {/* Intro & Masonry Grid - White Section */}
      <IntroGrid />

      {/* Services - Dark Section */}
      <Services />

      {/* Why Choose Me & Stats - White Section */}
      <WhyChooseMe />

      {/* Featured Projects - Dark Section */}
      <FeaturedProjects />

      {/* Testimonials Carousel - White Section */}
      <Testimonials />

      {/* Pricing Section - Light Section */}
      <Pricing />

      {/* FAQ Accordion - Dark Section */}
      <FAQ />

      {/* Footer - White Section with Massive Typography */}
      <Footer />
    </main>
  );
}

export default Landing;
