import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services, serviceCategories } from '@/data/siteData';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   SERVICES SECTION — Pinned Split-Screen Journey
   - Left: Fixed title, active category, progress bar, counter
   - Right: Large animated service cards that transition on scroll
   - 18 services grouped into 5 categories
   - ~600vh pin
   ═══════════════════════════════════════════════════════════════ */

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* Find current category based on active index */
  const activeCategory = useMemo(() => {
    return services[activeIndex]?.category ?? serviceCategories[0];
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const totalCards = services.length;

    /* Single ScrollTrigger: pin + scrub, ONLY updates React state.
       All card visuals are driven by React re-render via activeIndex. */
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${totalCards * 35}%`,
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const idx = Math.min(
          totalCards - 1,
          Math.floor(self.progress * totalCards),
        );
        setActiveIndex(idx);
      },
    });

    return () => {
      pinTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060820 0%, #0a0e27 30%, #0f1535 100%)' }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(90,164,177,1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#5AA4B1]/[0.04] rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#fd6909]/[0.03] rounded-full blur-[200px]" />

      <div className="relative h-full flex flex-col lg:flex-row">
        {/* ── LEFT PANEL (desktop) / TOP PANEL (mobile) ── */}
        <div className="w-full lg:w-[38%] xl:w-[35%] shrink-0 flex flex-col justify-center px-6 pt-16 pb-4 lg:pt-0 lg:pb-0 md:px-12 lg:px-16 xl:px-20 lg:h-full">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#5AA4B1] block mb-3 lg:mb-5">
            Our Services
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.0] mb-4 lg:mb-8">
            What We
            <br />
            <span className="bg-gradient-to-r from-[#fd6909] to-[#FF8A3D] bg-clip-text text-transparent">
              Deliver
            </span>
          </h2>

          {/* Active category */}
          <div className="mb-4 lg:mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#fd6909]" />
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider transition-all duration-500">
                {activeCategory}
              </span>
            </div>
          </div>

          {/* Category pills */}
          <div className="hidden lg:flex flex-col gap-2 mb-10">
            {serviceCategories.map((cat) => (
              <div
                key={cat}
                className={`text-xs font-medium px-4 py-2 rounded-full transition-all duration-500 w-fit ${
                  cat === activeCategory
                    ? 'bg-[#fd6909]/15 text-[#fd6909] border border-[#fd6909]/20'
                    : 'text-white/25 border border-transparent'
                }`}
              >
                {cat}
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="flex items-center gap-5">
            <div className="flex-1 max-w-[200px]">
              <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#fd6909] to-[#FF8A3D] transition-all duration-500 ease-out"
                  style={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[#fd6909] font-black text-3xl tabular-nums leading-none">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/15 text-sm mx-0.5">/</span>
              <span className="text-white/25 text-sm font-medium tabular-nums">
                {String(services.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — Animated Cards (React state-driven) ── */}
        <div className="hidden lg:flex flex-1 items-center justify-center pr-12 xl:pr-20">
          <div ref={cardsContainerRef} className="relative w-full max-w-[600px] h-[420px]">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;
              // isFuture = i > activeIndex

              return (
                <div
                  key={service.id}
                  className="svc-card absolute inset-0 transition-all duration-500 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? 'translateY(0px) scale(1)'
                      : isPast
                        ? 'translateY(-40px) scale(0.97)'
                        : 'translateY(60px) scale(0.95)',
                    zIndex: isActive ? 10 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div
                    className="h-full rounded-[24px] p-10 md:p-12 flex flex-col justify-between"
                    style={{
                      background: 'linear-gradient(145deg, rgba(30,36,85,0.6) 0%, rgba(15,21,53,0.8) 100%)',
                      border: '1px solid rgba(90,164,177,0.08)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
                    }}
                  >
                    <div>
                      {/* Number + Category */}
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#5AA4B1]/60">
                          {service.category}
                        </span>
                        <span className="text-white/[0.06] text-6xl font-black leading-none">
                          {String(service.id).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-[#fd6909]/10 flex items-center justify-center mb-7 border border-[#fd6909]/10">
                        <Icon size={30} strokeWidth={1.5} className="text-[#fd6909]" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/[0.04]">
                      <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#fd6909] to-[#FF8A3D]" />
                      <div className="flex gap-1">
                        {Array.from({ length: 3 }).map((_, d) => (
                          <div key={d} className="w-1 h-1 rounded-full bg-white/10" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE: Card below title (normal flow, no overlap) ── */}
        <div className="lg:hidden flex-1 flex items-start justify-center px-6 pb-6">
          <div className="relative w-full max-w-[400px] h-[300px]">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isActive = i === activeIndex;
              return (
                <div
                  key={`mobile-${service.id}`}
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
                    zIndex: isActive ? 10 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div
                    className="h-full rounded-[20px] p-6 flex flex-col justify-between"
                    style={{
                      background: 'linear-gradient(145deg, rgba(30,36,85,0.6) 0%, rgba(15,21,53,0.8) 100%)',
                      border: '1px solid rgba(90,164,177,0.08)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#fd6909]/10 flex items-center justify-center border border-[#fd6909]/10">
                          <Icon size={24} strokeWidth={1.5} className="text-[#fd6909]" />
                        </div>
                        <span className="text-white/[0.06] text-4xl font-black leading-none">
                          {String(service.id).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-3">{service.description}</p>
                    </div>
                    <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#fd6909] to-[#FF8A3D]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}