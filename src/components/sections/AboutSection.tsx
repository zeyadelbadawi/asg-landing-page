import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutContent, stats, visionText } from '@/data/siteData';
import { Shield, Globe, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const statIcons = [Shield, Globe, Users, Zap];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.about-animate');
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && section.contains(st.trigger as Element)) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-36 px-6" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)' }}>
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(30,36,85,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="about-animate mb-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#5AA4B1]">
            About ASG
          </span>
        </div>

        <h2 className="about-animate text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1e2455] mb-10 max-w-4xl tracking-tight leading-[1.05]">
          Building Safer,{' '}
          <span className="bg-gradient-to-r from-[#5AA4B1] to-[#7BC4CF] bg-clip-text text-transparent">
            Smarter
          </span>{' '}
          Futures
        </h2>

        <p className="about-animate text-lg md:text-xl text-[#1e2455]/60 max-w-3xl leading-relaxed mb-20 font-light">
          {aboutContent.intro}
        </p>

        {/* Stats Row */}
        <div className="about-animate grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((s, i) => {
            const Icon = statIcons[i];
            return (
              <div
                key={s.label}
                className="group relative p-8 rounded-[20px] bg-white border border-[#1e2455]/[0.04] hover:border-[#5AA4B1]/20 transition-all duration-500"
                style={{ boxShadow: '0 4px 30px rgba(30,36,85,0.04)' }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#5AA4B1]/8 flex items-center justify-center mb-5 group-hover:bg-[#5AA4B1]/15 transition-colors">
                  <Icon size={20} strokeWidth={1.5} className="text-[#5AA4B1]" />
                </div>
                <p className="text-4xl md:text-5xl font-extrabold text-[#1e2455] tracking-tight">
                  {s.value}
                  <span className="text-[#fd6909]">{s.suffix}</span>
                </p>
                <p className="text-xs uppercase tracking-[0.15em] text-[#1e2455]/40 mt-3 font-medium">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Vision Card */}
        <div
          className="about-animate relative p-10 md:p-16 rounded-[28px] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1e2455 0%, #0f1535 40%, #0a0e27 100%)',
            boxShadow: '0 30px 80px rgba(10,14,39,0.4)',
          }}
        >
          {/* Decorative grid inside card */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(90,164,177,1) 1px, transparent 1px), linear-gradient(90deg, rgba(90,164,177,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Glow accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#5AA4B1]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#fd6909]/8 rounded-full blur-[80px]" />

          <div className="relative">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#5AA4B1] mb-6 block">
              Our Vision
            </span>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/85 font-light max-w-4xl">
              {visionText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}