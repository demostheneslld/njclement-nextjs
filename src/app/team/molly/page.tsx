import GlassCard from '@/components/ui/GlassCard';
import Section from '@/components/ui/Section';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { FaLinkedin } from 'react-icons/fa6';

const experiences = [
  {
    company: "NJC Enterprises",
    role: "Partner & Co-Owner",
    period: "2024 - Present",
    description: "Co-leading software development and design for custom AI and SaaS solutions.",
    highlights: [
      "Designing elegant software systems that leverage AI",
      "Built AI-powered data pipeline converting spreadsheet data into automated maintenance charts and actionable insights",
      "Custom web design and business management services for small businesses in Oregon",
      "Managing client relationships and project delivery",
    ]
  },
  {
    company: "Healthcare Leadership",
    role: "Clinical Supervisor & Operations",
    period: "2012 - 2025",
    description: "Over a decade of progressive leadership in dermatology and healthcare operations, bringing process improvement, team leadership, and exceptional customer care to every role.",
    highlights: [
      "Knott Street Dermatology — Dermatology Technician, Mohs Surgery (2024-2025)",
      "Adventist Healthcare — Clinical Operations (2023-2024)",
      "The Oregon Clinic — Clinical Supervisor, Mohs Surgery (2018-2023)",
      "Led events, process improvement initiatives, and cross-functional team coordination",
    ]
  },
];

const skills = [
  { category: "Professional", items: ["Process Improvement", "Team Leadership", "Project Management", "Strategic Planning"] },
  { category: "Design", items: ["UI/UX Design", "Figma", "Canva", "Document Creation"] },
  { category: "Development", items: ["React", "Next.js", "TypeScript", "AI Systems"] },
  { category: "Communication", items: ["Presentation Skills", "Customer Care", "Event Coordination"] },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/molly-voorhees-376183192", icon: FaLinkedin },
  // Add more social links here
];

export default function MollyPage() {
  return (
    <>
      {/* Hero Section */}
      <Section 
        background="gradient" 
        gradientColors={["primary", "neutral", "accent"]}
        className="pt-10 pb-16"
      >
        <div className="glass-surface">
          <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors mb-8">
            <HiArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Photo */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 rounded-full blur opacity-30"
                   style={{
                     background: `linear-gradient(135deg, var(--c-accent), var(--c-accent-contrast))`
                   }}></div>
              <div className="relative overflow-hidden rounded-full border-2 border-accent">
                <Image
                  alt="Molly Voorhees"
                  className="w-48 h-48 md:w-64 md:h-64 object-cover"
                  src="/molly-photo.png"
                  width={256}
                  height={256}
                  priority
                />
              </div>
            </div>
            
            {/* Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Molly Voorhees</h1>
              <p className="text-xl text-slate-700 mb-4 font-medium">Owner & Software Engineer/Designer</p>
              <p className="text-lg text-white/90 max-w-2xl mb-6 drop-shadow-md">
                14 years in healthcare turned software engineer. Building intuitive systems 
                with care, one elegant solution at a time.
              </p>
              
              {/* Social Links */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-med hover:text-accent transition-colors"
                    aria-label={link.name}
                  >
                    <link.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Bio Section */}
      <Section background="transparent" className="py-16" divider>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">About</h2>
          <GlassCard className="p-8">
            <div className="space-y-4 text-med text-lg leading-relaxed">
              <p>
                With 14 years of experience in healthcare, I bring a unique perspective to software engineering—one shaped by caring for others. I&apos;ve seen firsthand how software systems can either empower or frustrate the people who depend on them. That experience drives me to build things better, focusing on the luxury of designing custom solutions that truly fit my clients&apos; needs. My background has taught me to create intuitive systems with the end user in mind, crafted to help people achieve their goals.
              </p>
              <p>
                As a business owner and partner at NJC Enterprises, I wear many hats—from client relationships to project management to hands-on design. My focus is on crafting elegant software systems that leverage AI to work smarter, not harder. I&apos;m passionate about simplifying complexity and staying at the forefront of AI developments to deliver exceptional value to every client.
              </p>
              <p>
                When I&apos;m not working, you&apos;ll find me spending evenings coding alongside my husband, hiking with our dogs, or traveling to new corners of the world. I&apos;m constantly learning—whether it&apos;s the latest in technology or the stories of the places we visit.
              </p>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Experience Section */}
      <Section background="transparent" className="py-16" divider>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                    <p className="text-accent">{exp.role}</p>
                  </div>
                  <p className="text-med mt-1 md:mt-0">{exp.period}</p>
                </div>
                <p className="text-med mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start text-med">
                      <span className="text-accent mr-2">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section background="transparent" className="py-16" divider>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <GlassCard key={index} className="p-6">
                <h3 className="text-lg font-bold text-accent mb-3">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-sm bg-glass-elev2 text-med border border-text-low">
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Education Section */}
      <Section background="transparent" className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Education</h2>
          <div className="space-y-6">
            <GlassCard className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center">
                  <Image
                    src="/Concordia.png"
                    alt="Concordia University"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-high">Concordia University</h3>
                  <p className="text-lg text-accent mb-2">2010 - 2013</p>
                  <p className="text-med">Associates Degree of Science</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center">
                  <Image
                    src="/heald.png"
                    alt="Heald College"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-high">Heald College</h3>
                  <p className="text-lg text-accent mb-2">Class of 2014</p>
                  <p className="text-med mb-4">Associates Degree of Science</p>
                  <ul className="space-y-2 text-med">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      4.0 GPA
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      National Honors Society Graduate
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Phi Sigma Sigma Alumna
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>
    </>
  );
}
