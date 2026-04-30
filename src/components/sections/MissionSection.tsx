import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { missionText, strategicGoals, coreValues } from '@/data/siteData';
import { Target, Lightbulb, TrendingUp, Handshake, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const goalIcons = [TrendingUp, Cpu, Target, Handshake, Lightbulb];

export default function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.mission-animate');
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
    <section
      ref={sectionRef}
      className="relative py-36 px-6"
      style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #0f1535 50%, #0a0e27 100%)' }}
    >
      {/* Hex grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(90,164,177,1) 1px, transparent 1px), linear-gradient(90deg, rgba(90,164,177,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow accents */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#5AA4B1]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-[#fd6909]/5 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Mission */}
        <div className="mission-animate mb-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#5AA4B1]">
            Our Mission
          </span>
        </div>
        <p className="mission-animate text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl leading-relaxed mb-24 font-light">
          {missionText}
        </p>

        {/* Strategic Goals */}
        <div className="mission-animate mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#fd6909]">
            Strategic Goals
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {strategicGoals.map((goal, i) => {
            const Icon = goalIcons[i % goalIcons.length];
            return (
              <div
                key={i}
                className="mission-animate group p-7 rounded-[20px] border border-white/[0.05] hover:border-[#5AA4B1]/20 transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#5AA4B1]/10 flex items-center justify-center mb-5 group-hover:bg-[#5AA4B1]/20 transition-colors">
                  <Icon size={18} strokeWidth={1.5} className="text-[#5AA4B1]" />
                </div>
                <p className="text-white/70 leading-relaxed text-[15px]">{goal}</p>
              </div>
            );
          })}
        </div>

        {/* Core Values — A·S·G */}
        <div className="mission-animate mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#fd6909]">
            Core Values — A · S · G
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {coreValues.map((val) => (
            <div
              key={val.letter + val.title}
              className="mission-animate group relative p-9 rounded-[20px] border border-white/[0.05] hover:border-[#fd6909]/20 transition-all duration-500 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              }}
            >
              {/* Large background letter */}
              <div className="absolute -top-6 -right-4 text-[140px] font-extrabold text-white/[0.02] leading-none select-none pointer-events-none">
                {val.letter}
              </div>

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#fd6909] to-[#FF8A3D] flex items-center justify-center mb-7 shadow-[0_8px_30px_rgba(253,105,9,0.2)]">
                  <span className="text-white text-2xl font-extrabold">{val.letter}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{val.title}</h3>
                <p className="text-white/50 leading-relaxed text-[15px]">{val.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}