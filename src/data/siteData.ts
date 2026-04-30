import {
  Package, Warehouse, Hammer, Truck, GraduationCap, PenTool,
  Wrench, Link, Settings, HeadphonesIcon, MessageSquare, WrenchIcon,
  Compass, FolderKanban, CheckCircle, TestTube, ShieldCheck, BookOpen,
  Globe, Sparkles, Zap, Users, Target, Building2,
  Camera, Lock, Shield, Brain, Eye, Scan, Wifi, Cpu, Monitor,
  LayoutDashboard, Home, Lightbulb, Gauge, Cable, BellRing, Megaphone, HeartPulse,
  type LucideIcon,
} from 'lucide-react';

/* ── Services (18 exact) ── */
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
}

export const serviceCategories = [
  'Supply Chain & Logistics',
  'Engineering & Design',
  'Implementation & Integration',
  'Operations & Support',
  'Professional Services',
] as const;

export const services: Service[] = [
  { id: 1, title: 'Importing & Logistics', description: 'End-to-end import management and logistics coordination for security equipment and smart systems across the MENA region.', icon: Package, category: 'Supply Chain & Logistics' },
  { id: 2, title: 'Warehousing', description: 'State-of-the-art warehousing facilities ensuring secure storage, inventory management, and rapid deployment of technology assets.', icon: Warehouse, category: 'Supply Chain & Logistics' },
  { id: 3, title: 'Contracting', description: 'Comprehensive contracting services for large-scale security infrastructure and smart building projects.', icon: Hammer, category: 'Supply Chain & Logistics' },
  { id: 4, title: 'Supplying', description: 'Premium supply chain solutions delivering world-class security and automation products to partners and clients.', icon: Truck, category: 'Supply Chain & Logistics' },
  { id: 5, title: 'Training', description: 'Professional certification programs and hands-on training for security systems operation and maintenance.', icon: GraduationCap, category: 'Professional Services' },
  { id: 6, title: 'Designing', description: 'Bespoke system architecture and design tailored to each client\'s unique security and operational requirements.', icon: PenTool, category: 'Engineering & Design' },
  { id: 7, title: 'Installations', description: 'Expert installation services ensuring precision deployment of surveillance, access control, and smart systems.', icon: Wrench, category: 'Implementation & Integration' },
  { id: 8, title: 'Integrations', description: 'Seamless integration of multi-vendor systems into unified, intelligent security and automation platforms.', icon: Link, category: 'Implementation & Integration' },
  { id: 9, title: 'Operations', description: 'Managed operations services providing 24/7 monitoring, incident response, and system optimization.', icon: Settings, category: 'Operations & Support' },
  { id: 10, title: 'Supporting', description: 'Dedicated technical support teams ensuring maximum uptime and rapid issue resolution for all deployed systems.', icon: HeadphonesIcon, category: 'Operations & Support' },
  { id: 11, title: 'Consulting', description: 'Strategic consulting services helping organizations assess risks, plan investments, and optimize security posture.', icon: MessageSquare, category: 'Professional Services' },
  { id: 12, title: 'Maintenance', description: 'Proactive and preventive maintenance programs extending system lifespan and ensuring peak performance.', icon: WrenchIcon, category: 'Operations & Support' },
  { id: 13, title: 'System Design & Consultancy', description: 'End-to-end system design from concept to detailed engineering, backed by deep domain expertise.', icon: Compass, category: 'Engineering & Design' },
  { id: 14, title: 'Project Management', description: 'Professional project management ensuring on-time, on-budget delivery of complex technology deployments.', icon: FolderKanban, category: 'Professional Services' },
  { id: 15, title: 'Installation & Commissioning', description: 'Full-scope installation and commissioning services with rigorous quality assurance and testing protocols.', icon: CheckCircle, category: 'Implementation & Integration' },
  { id: 16, title: 'Testing & Integration', description: 'Comprehensive testing, validation, and system integration ensuring flawless multi-platform interoperability.', icon: TestTube, category: 'Implementation & Integration' },
  { id: 17, title: 'Maintenance & After-Sales Support', description: 'Long-term maintenance contracts and after-sales support ensuring continuous system reliability and client satisfaction.', icon: ShieldCheck, category: 'Operations & Support' },
  { id: 18, title: 'Technical Training & Support', description: 'Advanced technical training programs empowering client teams with the knowledge to operate and maintain complex systems.', icon: BookOpen, category: 'Professional Services' },
];

/* ── Projects (6) ── */
export interface Project {
  id: number;
  title: string;
  client: string;
  location: string;
  image: string;
  technologies: string[];
  scale: string;
  description: string;
  category: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'ITS - Egypt Radar Smart System',
    client: 'Government & Public Sector',
    location: 'Cairo, Egypt',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/967905/2026-04-28/npmxbsqaafma/project-government-command-center.png',
    technologies: ['AI Analytics', 'Speed Cameras', 'Built Cameras'],
    scale: '2,000+ Radars',
    description: 'Managing road safety, speed monitoring, and real-time traffic control across highways and urban roads in Egypt required a highly accurate and scalable smart system capable of operating in diverse environmental and traffic conditions.',
    category: 'Government & Public Sector',
    link: "https://www.arab-security.com/projects/its-egypt-radar-smart-system", // 👈 اللينك الخارجي

  },
  {
    id: 2,
    title: 'Capital Walk | Advertising LED Displays',
    client: 'Capital Walk',
    location: 'New Administrative Capital, Egypt',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/967905/2026-04-28/npmxdiaaafmq/project-smart-city-surveillance.png',
    technologies: ['Screens', 'Video Wall', 'LED'],
    scale: '75 X 35m Pallet Screens',
    description: 'A comprehensive smart city infrastructure deployment connecting thousands of IoT sensors, AI cameras, and cloud analytics across Egypt\'s new administrative capital.',
    category: 'installation-commissioning',
    link: "https://www.arab-security.com/projects/capital-walk-led-displays", // 👈 اللينك الخارجي

  },
  {
    id: 3,
    title: 'Highway | Al Watanyah',
    client: 'Al Watanyah',
    location: 'Cairo, Egypt',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/967905/2026-04-28/npmxbhaaaflq/project-corporate-enterprise-security.png',
    technologies: ['Barrier', 'QNPR Cameras', 'Traffic'],
    scale: '1500+ Barrier Gates',
    description: 'Deployment of IP surveillance and DSS platform across highways and toll gates.',
    category: 'transportation-logistics',
    link: "https://www.arab-security.com/projects/highway-al-watanyah", // 👈 اللينك الخارجي

  },
  {
    id: 4,
    title: 'Hilton Nile Towers',
    client: 'Hilton',
    location: 'Maadi, Cairo',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/967905/2026-04-28/npmx4oyaafla/project-industrial-facility-monitoring.png',
    technologies: ['Entrance', 'Physical Security', 'Ballards'],
    scale: '20 Ballards',
    description: 'Installation of hydraulic bollards and sliding gate motors.',
    category: 'hospitality',
    link: "https://www.arab-security.com/projects/hilton-nile-towers", // 👈 اللينك الخارجي

  },
  {
    id: 5,
    title: 'Al Burouj Compound',
    client: 'Al Burouj Compound',
    location: 'Ismailia Desert Road, Cairo',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/967905/2026-04-28/npmxdiaaafmq/project-smart-city-surveillance.png',
    technologies: ['Surveillance', 'CCTV', 'DSS'],
    scale: '1000+ Cameras',

    description: 'ASG supplied, installed, and commissioned a complete surveillance system for Al Burouj Compound. The system included Dahua CCTV cameras connected to Dahua industrial switches and configured on Milestone VMS utilizing Dell servers and clients, with all cameras monitored through a 24/7 control room setup.',
    category: 'residential-mixed-use',
    link: "https://www.arab-security.com/projects/al-burouj-compound", // 👈 اللينك الخارجي

  },
  {
    id: 6,
    title: 'Aura Compound – CFC | Barrier Gates',
    client: 'Aura Compound',
    location: 'CFC, Cairo, Egypt',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/967905/2026-04-28/npmxbsqaafma/project-government-command-center.png',
    technologies: ['Barrier', 'RFIT', 'Access Control'],
    scale: '500+ Barriers',
    description: 'Supplying, installing, and commissioning barrier gates equipped with RFID readers. The implemented system used Magnetic Barrier Gates integrated with Centurion RFID readers.',
    category: 'residential-mixed-use',
    link: "https://www.arab-security.com/projects/aura-compound-cfc-barrier-gates", // 👈 اللينك الخارجي

  },
];

/* ── Partners ── */
export const partners: string[] = [
  'Honeywell', 'Axis Communications', 'Dahua Technology',
  'Milestone Systems', 'Genetec', 'Cisco', 'Bosch Security',
  'Schneider Electric', 'Siemens', 'ABB', 'Johnson Controls',
  'Crestron', 'Ruijie Networks', 'SKIDATA', 'ITC Audio',
];


export const Clients = [
  { name: "Honeywell", logo: "/clients/AMAN.png" },
  { name: "Axis Communications", logo: "/clients/1.png" },
  { name: "Axis Communications", logo: "/clients/2.png" },
  { name: "Axis Communications", logo: "/clients/3.png" },
  { name: "Axis Communications", logo: "/clients/4.png" },
  { name: "Axis Communications", logo: "/clients/5.png" },
  { name: "Axis Communications", logo: "/clients/6.png" },
  { name: "Axis Communications", logo: "/clients/7.png" },
  { name: "Axis Communications", logo: "/clients/8.png" },
  { name: "Axis Communications", logo: "/clients/9.png" },
  { name: "Axis Communications", logo: "/clients/10.png" },
  { name: "Axis Communications", logo: "/clients/11.png" },
  { name: "Axis Communications", logo: "/clients/12.png" },
  { name: "Axis Communications", logo: "/clients/13.png" },
  { name: "Axis Communications", logo: "/clients/14.png" },
  { name: "Axis Communications", logo: "/clients/15.png" },
  { name: "Axis Communications", logo: "/clients/16.png" },
  { name: "Axis Communications", logo: "/clients/17.png" },
  { name: "Axis Communications", logo: "/clients/18.png" },
  { name: "Axis Communications", logo: "/clients/19.png" },

];

/* ── Companies ── */
export interface Company {
  name: string;
  description: string;
  focus: string;
  link: string;
  logo?: string;

}

export const companies: Company[] = [
  {
    name: 'Arab Security Group',
    description: 'The flagship company specializing in integrated security systems, AI surveillance, and smart solutions for government.',
    focus: 'More Info',
    link: 'https://arab-security.com/',
    logo: "/assets/companies/GROUPLOGO.png",

  },
  {
    name: 'ASG Distribution',
    description: 'The distribution arm providing world-class security, networking, and automation products to system integrators and partners across the MENA region.',
    focus: 'More Info',
    link: 'https://asgdistribution.com/',
    logo: "/assets/companies/disty.png",


  },
  {
    name: 'One Place',
    description: 'A specialized smart home and commercial automation company delivering premium lifestyle technology solutions for residential and hospitality projects.',
    focus: 'More Info',
    link: 'https://oneplace.com.eg/',

  },
];

/* ── Strategic Goals (exact content) ── */
export const strategicGoals: string[] = [
  'Expand market presence across key sectors including smart buildings, hospitality, and infrastructure.',
  'Strengthen digital transformation to generate measurable business growth and qualified leads.',
  'Deliver high-quality, end-to-end solutions that enhance customer satisfaction and retention.',
  'Build long-term partnerships with clients, developers, and technology providers.',
  'Continuously innovate by adopting the latest technologies in security and smart systems.',
];

/* ── Core Values (exact content) ── */
export interface CoreValue {
  letter: string;
  title: string;
  description: string;
}

export const coreValues: CoreValue[] = [
  {
    letter: 'A',
    title: 'Accountability',
    description: 'We take ownership of our work, commitments, and results, ensuring reliability and trust in every project we deliver.',
  },
  {
    letter: 'S',
    title: 'Security Excellence',
    description: 'We are committed to the highest standards of safety, quality, and performance in all our solutions.',
  },
  {
    letter: 'G',
    title: 'Growth & Innovation',
    description: 'We continuously evolve, embracing new technologies and ideas to drive progress for our clients and our business.',
  },
];

/* ── Stats ── */
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 15, suffix: '+', label: 'Years of Experience' },
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 8, suffix: '+', label: 'Countries Served' },
  { value: 300, suffix: '+', label: 'Team Members' },
];

/* ── Navigation ── */
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

/* ── Exact Vision & Mission Content ── */
export const visionText = 'To be a leading regional provider of integrated smart security and technology solutions, recognized for innovation, reliability, and excellence in protecting people, assets, and environments.';

export const missionText = 'To deliver advanced, reliable, and tailored security and smart technology solutions that empower businesses and individuals, enhance safety, and create seamless, connected experiences through expertise, innovation, and trusted partnerships.';

/* ── Hero Content ── */
export const heroContent = {
  headline: 'Securing the Future. Intelligently.',
  subheadline: 'AI-powered security systems, smart city solutions, and IoT infrastructure — protecting what matters most across Egypt and the GCC.',
  primaryCta: 'Request a Consultation',
  secondaryCta: 'Explore Our Solutions',
};

/* ── About Content ── */
export const aboutContent = {
  intro: 'Founded in 2007, ASG (ASG) is a leading security and smart systems integrator operating across Egypt and the GCC region. We specialize in designing, deploying, and maintaining intelligent security ecosystems that protect people, empower enterprises, and transform cities.',
};