import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { companies } from '@/data/siteData';
import { Building2, Truck, Home } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const companyIcons = [Building2, Truck, Home];

export default function CompaniesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.company-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
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
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(90,164,177,1) 1px, transparent 1px), linear-gradient(90deg, rgba(90,164,177,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#5AA4B1] block mb-3">
            Our Companies
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            The ASG Ecosystem
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {companies.map((company, i) => {
            const Icon = companyIcons[i];
            return (
              <div
                key={company.name}
                className="company-card group relative p-9 rounded-[24px] border border-white/[0.05] hover:border-[#5AA4B1]/15 transition-all duration-500 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                }}
              >
                {/* Hover glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#5AA4B1]/0 group-hover:bg-[#5AA4B1]/5 rounded-full blur-[60px] transition-all duration-700" />

                <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#fd6909] to-[#FF8A3D] flex items-center justify-center mb-7 shadow-[0_8px_30px_rgba(253,105,9,0.2)] overflow-hidden">
  {i < 2 ? (
    <img
      src={company.logo}
      alt={`${company.name} logo`}
      className="w-11 h-11 object-contain"
    />
  ) : (
    <Icon size={28} strokeWidth={1.5} className="text-white" />
  )}
</div>
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{company.name}</h3>
                  <p className="text-white/45 leading-relaxed mb-6 text-[15px]">{company.description}</p>
                  <a
  href={company.link}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#5AA4B1] hover:text-white transition-all duration-300 group"
>
  {company.focus}
  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}