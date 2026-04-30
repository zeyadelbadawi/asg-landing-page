import { Clients } from "@/data/siteData";

export default function ClientsSection() {
  const row1 = Clients;
  const row2 = [...Clients].reverse();

  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)",
      }}
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-14 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#5AA4B1] block mb-3">
          Technology Clients
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1e2455] tracking-tight">
          Our Clients
        </h2>
      </div>

      {/* ROW 1 */}
      <div className="relative mb-5">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left gap-5 w-max">
          {[...row1, ...row1].map((client, i) => (
            <div
              key={`r1-${i}`}
              className="group flex-shrink-0 w-[200px] h-[80px] rounded-2xl bg-white border border-[#1e2455]/[0.04] flex items-center justify-center hover:border-[#5AA4B1]/20 transition-all duration-300"
              style={{ boxShadow: "0 2px 20px rgba(30,36,85,0.03)" }}
            >
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="w-auto h-[36px] object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-right gap-5 w-max">
          {[...row2, ...row2].map((client, i) => (
            <div
              key={`r2-${i}`}
              className="group flex-shrink-0 w-[200px] h-[80px] rounded-2xl bg-white border border-[#1e2455]/[0.04] flex items-center justify-center hover:border-[#5AA4B1]/20 transition-all duration-300"
              style={{ boxShadow: "0 2px 20px rgba(30,36,85,0.03)" }}
            >
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="w-auto h-[36px] object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}