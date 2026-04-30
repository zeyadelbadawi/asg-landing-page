import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import MissionSection from '@/components/sections/MissionSection';
import PartnersSection from '@/components/sections/PartnersSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CompaniesSection from '@/components/sections/CompaniesSection';
import LeadFormSection from '@/components/sections/LeadFormSection';
import FooterSection from '@/components/sections/FooterSection';
import ClientsSection from '@/components/sections/ClientsSection';
gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ── Lenis smooth scroll ── */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    /* Sync Lenis → ScrollTrigger */
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    /* ── Section fade-in animations (only for non-pinned sections) ── */
    const fadeInSections = mainRef.current?.querySelectorAll<HTMLElement>('.fade-section');
    if (fadeInSections) {
      fadeInSections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#0a0e27]">
      <Header />
      <main>
        {/* Hero — has its own pin, no wrapper animation */}
        <HeroSection />

        {/* Non-pinned sections get fade-in */}
        <div className="fade-section">
          <AboutSection />
        </div>
        <div className="fade-section">
          <MissionSection />
        </div>
        <div className="fade-section">
          <PartnersSection />
        </div>

        {/* Projects — has its own pin, NO wrapper animation */}
        <ProjectsSection />

        {/* Services — has its own pin, NO wrapper animation */}
        <ServicesSection />
        <div className="fade-section">
          <ClientsSection />
        </div>
        {/* Non-pinned sections get fade-in */}
        <div className="fade-section">
          <CompaniesSection />
        </div>
        <div className="fade-section">
          <LeadFormSection />
        </div>

        <FooterSection />
      </main>
    </div>
  );
}