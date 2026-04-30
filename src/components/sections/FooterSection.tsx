import { navLinks, services } from '@/data/siteData';

export default function FooterSection() {
  return (
    <footer
      className="text-white py-24 px-6"
      style={{ background: 'linear-gradient(180deg, #060820 0%, #040612 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-14 mb-20">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/logo-footer.png" alt="ASG" className="h-[50px] w-auto mb-5" />
            <p className="text-white/30 text-sm leading-relaxed">
              ASG — Leading security and smart systems integrator across Egypt and the GCC.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6">Navigation</h4>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/35 hover:text-[#5AA4B1] transition-colors text-sm font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6">Services</h4>
            <ul className="space-y-2.5">
              {services.slice(0, 8).map((s) => (
                <li key={s.id}>
                  <span className="text-white/30 text-sm">{s.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6">Contact</h4>
            <ul className="space-y-3.5 text-sm text-white/35">
              <li>4 Dr. Mohamed Awad, Al Mintaqah as Sādisah, Nasr City, Cairo, Egypt</li>
              <li>0223495290</li>
              <li>infoegypt@arab-security.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">
            © 2026 ASG. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 hover:text-[#5AA4B1] transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-white/20 hover:text-[#5AA4B1] transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}