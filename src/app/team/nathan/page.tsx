'use client';

import GlassCard from '@/components/ui/GlassCard';
import Section from '@/components/ui/Section';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaMedium, FaStackOverflow, FaXTwitter, FaBluesky } from 'react-icons/fa6';

const experiences = [
  {
    company: "Spreedly",
    role: "Application Architect",
    period: "2025 - Present",
    description: "Leading architecture and AI-empowered development at Spreedly following their successful acquisition of Dodgeball.",
    highlights: [
      "Lead adoption of AI-empowered processes, development practices, and feature development",
      "Architect full-stack SaaS fraud prevention platform at enterprise scale",
      "Develop public SDKs, customer portals, and workflow orchestration engines"
    ]
  },
  {
    company: "Dodgeball",
    role: "Application Architect",
    period: "2023 - Present",
    description: "Enterprise Fraud Prevention Orchestration Platform. Successfully acquired by Spreedly.",
    highlights: [
      "Built powerful features like Intelligent Labeling and AI Second Opinion™",
      "Architected fraud detection and response pipelines for enterprise customers"
    ]
  },
  {
    company: "NJC Enterprises",
    role: "Founder & Principal Engineer",
    period: "2015 - Present",
    description: "Software Architecture & Development Consulting",
    highlights: [
      "Designed mission-critical customer portals for aerospace maintenance companies",
      "Deployed custom project tracking and management tooling for architecture firms"
    ]
  },
  {
    company: "Printforia",
    role: "Software Engineering Manager",
    period: "2020 - 2023",
    description: "Enterprise Print on Demand as a Service",
    highlights: [
      "Led engineering team with sprint coordination, product design, and stakeholder management",
      "Designed microservices architecture for order intake, routing, and production automation",
      "Created stateless image processing services for metadata updates and optimization"
    ]
  },
  {
    company: "LifePort",
    role: "Software Architect",
    period: "2015 - 2020",
    description: "Aerospace Manufacturing",
    highlights: [
      "Architected company-wide business intelligence platform achieving >50% MAU",
      "Built integrated systems for sales forecasting, vendor management, and compliance tracking"
    ]
  }
];

const skills = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "C#", "SQL", "Go"] },
  { category: "Frontend", items: ["React", "Next.js", "Vue", "Angular", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "NestJS", "Django", ".NET Core"] },
  { category: "Infrastructure", items: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"] },
  { category: "AI & ML", items: ["OpenAI", "Claude", "Cursor", "Agentic Workflows", "MCP"] },
  { category: "Databases", items: ["PostgreSQL", "Redis", "Cassandra", "Kafka"] }
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/demostheneslld", icon: FaGithub },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/njclement/", icon: FaLinkedin },
  { name: "Medium", href: "https://articles.njclement.com/", icon: FaMedium },
  { name: "StackOverflow", href: "https://stackoverflow.com/users/4005915/nathan-clement", icon: FaStackOverflow },
  { name: "Twitter", href: "https://twitter.com/NathanJClement", icon: FaXTwitter },
  { name: "Bluesky", href: "https://bsky.app/profile/njclement.com", icon: FaBluesky },
];

export default function NathanPage() {
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
                  alt="Nathan Clement"
                  className="w-48 h-48 md:w-64 md:h-64 object-cover"
                  src="/profile.png"
                  width={256}
                  height={256}
                  priority
                />
              </div>
            </div>
            
            {/* Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Nathan Clement</h1>
              <p className="text-xl text-slate-700 mb-4 font-medium">Founder & Senior Software Engineer</p>
              <p className="text-lg text-white/90 max-w-2xl mb-6 drop-shadow-md">
                Full-stack developer and application architect with over a decade of experience building 
                scaled SaaS platforms. Currently leading architecture and AI-powered development at Spreedly.
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
                I love solving problems. During college, I discovered the power of automation during a final 
                project for a class in Government. After spending hours filling a giant spreadsheet with data, 
                my hands were hurting from all the clicking, copying, and pasting. I knew there must be a better way.
              </p>
              <p>
                A few Google searches later, I built my first macro, changing the way I thought about work forever. 
                I've spent the years since learning to code from the ground up, one project at a time.
              </p>
              <p>
                I learned Full Stack Development while automating my first job, eventually building web applications, 
                automating data processes, and creating interactive visualizations. Over time, I started working with 
                a team of developers, took leadership roles in more projects, and eventually grew to manage engineering teams.
              </p>
              <p>
                Since the advent of Generative AI, I have stayed on the bleeding edge of the field, connecting with 
                leading researchers, developers, and business leaders to build the future of AI. I'm an active 
                contributor to the AI Biz Hour podcast and regularly speak and write about the evolving landscape of AI.
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Expertise</h2>
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
      <Section background="transparent" className="py-16" divider>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Education</h2>
          <GlassCard className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-32 h-32 bg-contain bg-center bg-no-repeat flex-shrink-0" 
                   style={{ backgroundImage: `url(/harvard-logo.png)` }}></div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Harvard University</h3>
                <p className="text-lg text-accent mb-2">Class of 2014</p>
                <p className="text-med mb-4">A.B. Degree in Government with Secondary in Psychology</p>
                <ul className="space-y-2 text-med">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    Coursework in Computer Science including Data Science and Statistics
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    3 Years Varsity Water Polo
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    GPA: 3.56/4.00
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Companies Section */}
      <Section background="transparent" className="py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Organizations</h2>
          <p className="text-med text-center mb-8">Companies that have shaped my professional journey</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Spreedly", logo: "/spreedly.png", desc: "Payment Orchestration" },
              { name: "Dodgeball", logo: "/career/dodgeball.svg", desc: "Fraud Prevention" },
              { name: "Printforia", logo: "/career/printforia.png", desc: "Print on Demand" },
              { name: "EAP", logo: "/career/eap.png", desc: "Enterprise Applications" },
              { name: "LifePort", logo: "/career/lifeport.png", desc: "Aerospace Manufacturing" },
              { name: "Lockheed Martin", logo: "/career/lockheed-martin.png", desc: "Aerospace & Defense" },
              { name: "Facebook", logo: "/career/facebook.png", desc: "Social Media" },
              { name: "US Congress", logo: "/career/congress.png", desc: "Legislative Body" },
              { name: "KPFF", logo: "/kpff.png", desc: "Structural & Civil Engineering" },
            ].map((company, index) => (
              <GlassCard key={index} className="p-4 text-center">
                <div className="h-16 mb-3 flex items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-h-full max-w-full object-contain"
                    width={120}
                    height={64}
                  />
                </div>
                <h4 className="text-sm font-semibold text-white">{company.name}</h4>
                <p className="text-xs text-med">{company.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
