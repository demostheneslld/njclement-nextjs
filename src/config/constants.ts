import { ContentRendererTypes } from "@/config/pdf-setup";
import { ContentItem } from "@/types/pdf/ContentItem";
import { ExperienceItem } from "@/types/pdf/ExperienceItem";

// ===========================
// Site Configuration
// ===========================

export const siteConfig = {
  name: "Nathaniel J. Clement",
  title: "Software Engineer & Architect",
  description: "Full-stack developer and application architect specialized in building scaled SaaS platforms.",
  email: "contact@njclement.com",
  github: "https://github.com/demostheneslld",
  domain: "njclement.com",
  openGraph: {
    image: "/logo.png",
  },
  analytics: {
    // Add analytics providers config if needed
  },
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://njclement.com",
};

// ===========================
// Navigation & Links
// ===========================

export interface NavigationPage {
  name: string;
  href: string;
  current: boolean | null;
  target?: string;
}

export const navigationPages: NavigationPage[] = [
  { name: "Home", href: "/", current: null },
  { name: "Articles", href: "https://articles.njclement.com/", current: null, target: '_blank' },
  { name: "Resume", href: "/resume", current: null },
  { name: "Portfolio", href: "/portfolio", current: null },
];

export interface SocialLink {
  name: string;
  href: string;
  imageUrl: string;
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/demostheneslld", imageUrl: "/social/github.png" },
  { name: "Twitter", href: "https://twitter.com/NathanJClement", imageUrl: "/social/twitter.png" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/njclement/", imageUrl: "/social/linkedin.png" },
  { name: "StackOverflow", href: "https://stackoverflow.com/users/4005915/nathan-clement", imageUrl: "/social/stackoverflow.png" },
];

// ===========================
// Homepage Content
// ===========================

export const homepageContent = {
  hero: {
    title: "Software Engineering",
    titleHighlight: true,
    subtitle: "Leader & Architect",
    description: "Building scaled SaaS platforms and leading engineering teams to deliver exceptional products.",
    primaryButton: {
      text: "View Resume",
      href: "/resume",
    },
    secondaryButton: {
      text: "Explore Portfolio",
      href: "/portfolio",
    },
  },
  about: {
    title: "Biography",
    subtitle: "My journey and approach to software engineering and leadership",
  },
  career: {
    title: "Career Journey",
    subtitle: "Organizations that have shaped my professional experience",
  },
  education: {
    title: "Education",
    subtitle: "Academic foundation and credentials",
    university: "Harvard University",
    graduation: "Class of 2014",
    degree: "A.B. Degree in Government with Secondary in Psychology",
    highlights: [
      "Coursework in Computer Science including Data Science and Statistics",
      "3 Years Varsity Water Polo",
      "GPA: 3.56/4.00",
    ],
  },
  skills: {
    title: "Technical Expertise",
    subtitle: "Tools, languages, and technologies I specialize in",
  },
  cta: {
    title: "Ready to work together?",
    description: "I'm always interested in new challenges and opportunities to build amazing products.",
    primaryButton: {
      text: "Get in Touch",
      href: "/contact",
    },
    secondaryButton: {
      text: "See My Work",
      href: "/portfolio",
    },
  },
  quote: "The Measure of a Man is not who he is, nor is it who he ought to be. It is the percentage of who he ought to be that he is.",
};

export const bio = `I love solving problems...

During college, I discovered the power of automation during a final project for a class in Government. After spending hours filling a giant spreadsheet with data about social media footprints for hundreds of members of Congress, my hands were hurting from all the clicking, copying, and pasting. I knew there must be a better way. A few Google searches later, I built my first macro, changing the way I thought about work forever. I've spent the years since learning to code from the ground up, one project at a time.

I learned Full Stack Development while automating my first job, eventually building web applications, automating data processes, and creating interactive visualizations of information. Over time, I started working with a team of developers, and took a leadership role in more projects, until I eventually grew to manage a small engineering team: running sprint meetings, planning out architectural decisions, and coordinating tasks between developers.

Few things on Earth satisfy the soul like watching a vision come to life in the hands of a talented and engaged team. I crave that feeling and the fulfillment that comes with it, especially when pursuing objectives that inspire positive, meaningful change in the world, and in the lives of people.
`;

// ===========================
// Career & Experience
// ===========================

export interface CareerItem {
  name: string;
  href: string;
}

export const careerItems: CareerItem[] = [
  { name: "Printforia", href: "/career/printforia.png" },
  { name: "EAP", href: "/career/eap.png" },
  { name: "LifePort", href: "/career/lifeport.png" },
  { name: "Lockheed Martin", href: "/career/lockheed-martin.png" },
  { name: "Facebook", href: "/career/facebook.png" },
  { name: "US Congress", href: "/career/congress.png" },
];

// ===========================
// Technical Proficiencies
// ===========================

export interface TechnicalProficiency {
  name: string;
  href: string;
}

export const technicalProficiencies: Record<string, TechnicalProficiency[]> = {
  Languages: [
    { name: "Javascript", href: "/technical/javascript.png" },
    { name: "TypeScript", href: "/technical/typescript.png" },
    { name: "Python", href: "/technical/python.png" },
    { name: "C#", href: "/technical/csharp.png" },
    { name: "HTML", href: "/technical/html.png" },
    { name: "CSS/LESS/SCSS", href: "/technical/css.png" },
    { name: "SQL", href: "/technical/sql.png" },
  ],
  "Backend Frameworks": [
    { name: "Node JS", href: "/technical/node.png" },
    { name: "Django", href: "/technical/django.png" },
    { name: ".NET Core", href: "/technical/dotnetcore.png" },
  ],
  "Frontend Frameworks": [
    { name: "Vue", href: "/technical/vue.png" },
    { name: "Angular", href: "/technical/angular.svg" },
    { name: "Django", href: "/technical/django.png" },
    { name: "NextJS", href: "/technical/nextjs.png" },
    { name: "React", href: "/technical/react.png" },
  ],
  "Developer Tools": [
    { name: "Git", href: "/technical/git.png" },
    { name: "GitHub", href: "/technical/github.png" },
    { name: "CircleCI", href: "/technical/circleci.png" },
    { name: "Microsoft Azure", href: "/technical/azure.png" },
    { name: "Netlify", href: "/technical/netlify.png" },
    { name: "Docker", href: "/technical/docker.png" },
    { name: "Kubernetes", href: "/technical/kubernetes.png" },
    { name: "VS Code", href: "/technical/vscode.png" },
  ],
  "Design Tools": [
    { name: "Inkscape", href: "/technical/inkscape.png" },
    { name: "GIMP", href: "/technical/gimp.png" },
  ],
};

// ===========================
// Portfolio
// ===========================

export interface PortfolioItem {
  name: string;
  description: string;
  link: string;
  imageUrl: string;
  technologies?: string[];
  featured?: boolean;
}

const srcString = "src=njclement";

export const portfolioItems: PortfolioItem[] = [
  {
    name: "wevebeeneverywhere.com",
    description: "Travel Blog with Integrated Maps",
    link: `https://wevebeeneverywhere.com?${srcString}`,
    imageUrl: "/portfolio/wevebeeneverywhere.png",
    technologies: ["NextJS", "Google Maps API", "TailwindCSS"],
    featured: true,
  },
];

// ===========================
// Resume Data
// ===========================

export const defaultResumeItems: ContentItem[] = [
  new ContentItem({
    rendererKey: ContentRendererTypes.TITLE,
    content: {
      name: 'Nathaniel J. Clement',
      email: 'resume@njclement.com',
      website: 'njclement.com',
      // address: 'Portland, OR | Vancouver, WA | Remote',
      phone: 'phone upon request',
      summary: 'Building Scaled SaaS Platforms | Proven Leader | Full-Stack Application Architect',
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.SECTION,
    content: { title: 'Professional Experience' },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'Dodgeball',
      subtitle: 'Enterprise Fraud Prevention Orchestration Platform',
      description: 'Application Architect',
      location: 'Remote',
      dateRange: '2023 - Present',
      items: [
        new ExperienceItem('Architect full-stack SaaS fraud prevention platform at scale for enterprise customers'),
        new ExperienceItem('Develop public SDKs, External Customer Portal, workflow orchestration engine, and other systems for fraud detection and response pipelines'),
      ]
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'NJC Enterprises',
      subtitle: 'Software Architecture & Development Consulting',
      description: 'Founder & Principal Engineer',
      location: 'Remote',
      dateRange: '2015 - Present',
      items: [
        new ExperienceItem('Designed and implemented mission-critical customer portal and internal integrations for an aerospace maintenance company.'),
        new ExperienceItem('Deployed custom project tracking visualizations and management tooling for a large architecture firm'),
      ]
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'Printforia',
      subtitle: 'Enterprise Print on Demand as a Service',
      description: 'Software Engineering Manager',
      location: 'Remote',
      dateRange: '2020 - 2023',
      items: [
        new ExperienceItem('Led engineering team, including sprint coordination, product/system design, and stakeholder management'),
        new ExperienceItem('Designed and implemented microservices architecture powering order intake, event management, routing, warehouse operations, and production automation'),
        new ExperienceItem('Created stateless service automating image processing: from metadata updates to whitespace optimization'),
      ]
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'LifePort',
      subtitle: 'Aerospace Manufacturing',
      description: 'Software Architect',
      location: 'Woodland, WA',
      dateRange: '2015 - 2020',
      items: [
        new ExperienceItem('Architected and developed company-wide business intelligence platform achieving > 50% MAU company-wide'),
        new ExperienceItem('Built integrated systems for sales forecasting, vendor management, and EPA compliance tracking'),
        new ExperienceItem('Spearheaded modernization of company website and internal tools, emphasizing security and user experience'),
      ]
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.SECTION,
    content: { title: 'Business Expertise' },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'Leadership & Mentorship',
      subtitle: 'Executive Communication, Corporate Strategy, Agile Project Management, Lean Six Sigma, Technical Hiring & Management',
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'Influential Books',
      subtitle: '5 Levels of Leadership, Extreme Ownership, Clean Code, Extreme Programming Explained, Death March, Agile Estimating and Planning, Meditations',
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.SECTION,
    content: { title: 'Technical Expertise' },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: { 
      title: 'System Design',
      subtitle: 'Distributed Systems, API Gateways, Microservices, Message Queues, Event-Driven Architecture, CQRS, Caching Strategies, High Availability, Machine Learning, ETL processes'
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'Languages',
      subtitle: 'JavaScript/TypeScript, Python, Bash/Shell, C#, SQL, Go, HTML, CSS, and more...',
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'Infrastructure',
      subtitle: 'Docker, Kubernetes, AWS, Azure, Terraform, Cloudflare, NGINX',
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'Backend',
      subtitle: 'Node.js (Express, NestJS, TypeORM, Prisma), Python (Django, FastAPI), C# (.NET Core)',
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'Frontend',
      subtitle: 'React, Next.js, Remix, Angular, Vue3, Tailwind, Vite, and more...',
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'DevOps',
      subtitle: 'CI/CD (GitHub Actions, CircleCI), Monitoring (Sentry, Datadog), Alerting (PagerDuty), Logging (Datadog, AWS), Testing (Artillery, Playwright)',
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.SECTION,
    content: {
      title: 'Travels',
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      subtitle: 'Canada, Egypt, England, Ethiopia, Italy, Kenya, Mexico, Namibia, Scotland, South Africa, Tanzania, Zambia.',
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.SECTION,
    content: { title: 'Education' },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: 'Harvard University',
      subtitle: 'A.B. in Government and Psychology',
      location: 'Cambridge, MA',
      dateRange: '2010 - 2014',
      items: [
        new ExperienceItem('GPA: 3.56/4.00 | Varsity Men\'s Water Polo Team Member'),
      ]
    },
  }),
];
