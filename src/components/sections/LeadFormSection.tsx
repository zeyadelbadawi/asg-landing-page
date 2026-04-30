import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MessageCircle, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LeadFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    service: '',
    serviceSolution: '',
    comment: '',
    companyName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setIsSuccess(false);
    setSubmitError('');

    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'landing-page',
          name: formData.name,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          solution: formData.serviceSolution,
          message: formData.comment,
          companyName: formData.companyName,
        }),
      });

      const text = await res.text();

      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { error: text || 'Server returned non-JSON error' };
      }
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }
      

      setIsSuccess(true);

      setFormData({
        name: '',
        phone: '',
        company: '',
        service: '',
        serviceSolution: '',
        comment: '',
        companyName: '',
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.form-animate');

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'top 60%',
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

  const serviceOptions = [
    'Importing & Logistics',
    'Warehousing',
    'Contracting',
    'Supplying',
    'Training',
    'Designing',
    'Installations',
    'Integrations',
    'Operations',
    'Supporting',
    'Consulting',
    'Maintenance',
    'System Design & Consultancy',
    'Project Management',
    'Installation & Commissioning',
    'Testing & Integration',
    'Maintenance & After-Sales Support',
    'Technical Training & Support',
  ];

  const inputClass =
    'w-full px-5 py-3.5 rounded-xl border border-[#1e2455]/8 bg-[#F8FAFC] text-[#1e2455] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#5AA4B1]/20 focus:border-[#5AA4B1] transition-all placeholder:text-[#1e2455]/30';

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-36 px-6"
      style={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(30,36,85,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="form-animate mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#5AA4B1]">
                Get in Touch
              </span>
            </div>

            <h2 className="form-animate text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1e2455] mb-8 tracking-tight leading-[1.05]">
              Let&apos;s Discuss{' '}
              <span className="bg-gradient-to-r from-[#fd6909] to-[#FF8A3D] bg-clip-text text-transparent">
                Your Project
              </span>
            </h2>

            <p className="form-animate text-lg text-[#1e2455]/50 mb-14 leading-relaxed font-light max-w-md">
              Ready to secure and transform your infrastructure? Our team of experts is here to
              help you design the perfect solution.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: MessageCircle,
                  color: '#25D366',
                  bg: '#25D366',
                  label: 'WhatsApp',
                  value: '+20 10 97111713',
                },
                {
                  icon: Phone,
                  color: '#5AA4B1',
                  bg: '#5AA4B1',
                  label: 'Phone',
                  value: '0223495290',
                },
                {
                  icon: Mail,
                  color: '#fd6909',
                  bg: '#fd6909',
                  label: 'Email',
                  value: 'infoegypt@arab-security.com',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="form-animate flex items-center gap-5 p-5 rounded-2xl bg-white border border-[#1e2455]/[0.04] hover:border-[#5AA4B1]/15 transition-all duration-300"
                  style={{ boxShadow: '0 2px 20px rgba(30,36,85,0.03)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${item.bg}10` }}
                  >
                    <item.icon size={20} strokeWidth={1.5} style={{ color: item.color }} />
                  </div>

                  <div>
                    <p className="text-xs text-[#1e2455]/35 font-medium uppercase tracking-wider">
                      {item.label}
                    </p>

                    {item.label === 'WhatsApp' ? (
                      <a
                        href={`https://wa.me/${item.value.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#1e2455] text-[15px] hover:text-[#25D366] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-[#1e2455] text-[15px]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-animate">
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-[24px] bg-white border border-[#1e2455]/[0.04] space-y-5"
              style={{ boxShadow: '0 20px 60px rgba(30,36,85,0.06)' }}
            >
              <div>
                <label className="block text-xs font-semibold text-[#1e2455]/50 mb-2 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e2455]/50 mb-2 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="+20 xxx xxx xxxx"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e2455]/50 mb-2 uppercase tracking-wider">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Your company"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e2455]/50 mb-2 uppercase tracking-wider">
                  Solution
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a Solution</option>
    <option value="integrated-security">Integrated Security</option>
    <option value="access-control-id">Access Control & ID</option>
    <option value="physical-security">Physical Security</option>
    <option value="parking-traffic">Parking & Traffic</option>
    <option value="fire-life-safety">Fire & Life Safety</option>
    <option value="light-current-elv">Light Current & ELV</option>
    <option value="smart-solutions">Smart Solutions</option>
    <option value="x-ray-inspection">X-Ray & Inspection</option>
    <option value="audio-visual">Audio Visual</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e2455]/50 mb-2 uppercase tracking-wider">
                  Comment
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your project"
                  required
                />
              </div>

              {isSuccess && (
                <p className="text-sm font-semibold text-green-600">
                  Submitted successfully.
                </p>
              )}

              {submitError && (
                <p className="text-sm font-semibold text-red-600">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#fd6909] to-[#FF8A3D] text-white font-bold rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 8px 30px rgba(253,105,9,0.25)' }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
