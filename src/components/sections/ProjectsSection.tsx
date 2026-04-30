import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/siteData';
import { MapPin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   PROJECTS SECTION — Full-Screen Cinematic Horizontal Scroll
   - 6 projects, each ~95vw × 85vh
   - Large background image + dark overlay + glass info panel
   - Progress bar + counter
   - Horizontal pinned scroll
   ═══════════════════════════════════════════════════════════════ */

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalSlides = projects.length;
    const slideWidth = window.innerWidth * 0.95;
    const gap = 24;
    const totalScroll = (slideWidth + gap) * (totalSlides - 1);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalScroll + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (totalSlides - 1));
            setActiveIndex(idx);
          },
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #080c22 100%)' }}
    >
      {/* Top header bar */}
      <div className="absolute top-0 left-0 right-0 z-10 px-8 md:px-16 lg:px-20 pt-10 pb-6 flex items-end justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#5AA4B1] block mb-3">
            Featured Projects
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight">
            Our Work
          </h2>
        </div>

        <div className="flex items-center gap-6">
          {/* Progress dots */}
          <div className="hidden md:flex gap-1.5">
            {projects.map((_, i) => (
              <div
                key={i}
                className={`h-[3px] rounded-full transition-all duration-600 ${
                  i === activeIndex ? 'w-10 bg-[#fd6909]' : i < activeIndex ? 'w-4 bg-white/15' : 'w-4 bg-white/[0.06]'
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="flex items-baseline gap-1">
            <span className="text-[#fd6909] font-black text-3xl tabular-nums leading-none">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/15 text-sm mx-0.5">/</span>
            <span className="text-white/25 text-sm font-medium tabular-nums">
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Track */}
      <div className="h-full flex items-center pt-16">
        <div ref={trackRef} className="flex gap-6 pl-8 md:pl-16 lg:pl-20" style={{ willChange: 'transform' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 relative rounded-[24px] overflow-hidden group"
              style={{
                width: '95vw',
                height: '82vh',
                maxHeight: '800px',
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform ease-out" style={{ transitionDuration: '1.2s' }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060820] via-[#060820]/60 to-[#060820]/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060820]/50 to-transparent" />
              </div>

              {/* Project number — large watermark */}
              <div className="absolute top-8 right-10 text-white/[0.03] text-[180px] md:text-[220px] font-black leading-none select-none">
                {String(project.id).padStart(2, '0')}
              </div>

              {/* Category badge */}
              <div className="absolute top-8 left-8 md:left-10">
                <span className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#5AA4B1] bg-[#5AA4B1]/[0.08] border border-[#5AA4B1]/15 rounded-full backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              {/* Glass Info Panel — bottom left */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 lg:p-14">
                <div
                  className="max-w-2xl rounded-[20px] p-8 md:p-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15,21,53,0.85) 0%, rgba(10,14,39,0.9) 100%)',
                    border: '1px solid rgba(90,164,177,0.1)',
                    backdropFilter: 'blur(30px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Client */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#fd6909]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#fd6909]">
                      {project.client}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-white/45 leading-relaxed mb-6 max-w-xl">
                    {project.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin size={13} strokeWidth={1.5} className="text-[#5AA4B1]" />
                      <span className="text-white/50 text-sm">{project.location}</span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <span className="text-[#fd6909] font-bold text-sm">{project.scale}</span>
                  </div>

                  {/* Tech tags + CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-[10px] font-semibold rounded-full bg-white/[0.04] text-white/50 border border-white/[0.06] uppercase tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
  href={project.link}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => e.stopPropagation()} // 👈 مهم
  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#fd6909]/40 group-hover:bg-[#fd6909]/10 transition-all duration-500 ml-4 flex-shrink-0"
>
  <ArrowUpRight
    size={16}
    strokeWidth={1.5}
    className="text-white/30 group-hover:text-[#fd6909] transition-colors duration-500"
  />
</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}