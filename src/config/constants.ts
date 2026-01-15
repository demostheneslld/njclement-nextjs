import { ContentRendererTypes } from "@/config/pdf-setup";
import { ContentItem } from "@/types/pdf/ContentItem";
import { ExperienceItem } from "@/types/pdf/ExperienceItem";
import {
  FaBluesky,
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaStackOverflow,
  FaXTwitter
} from "react-icons/fa6";

// ===========================
// Site Configuration
// ===========================

export const siteConfig = {
  name: "Nathaniel J. Clement",
  title: "Software Engineer & Architect",
  description:
    "Full-stack developer and application architect specialized in building scaled SaaS platforms.",
  email: "contact@njclement.com",
  github: "https://github.com/demostheneslld",
  domain: "njclement.com",
  openGraph: {
    image: "/og.png",
    imageAlt: "Nathaniel J. Clement - Software Engineering Leader & Architect",
    imageWidth: 1200,
    imageHeight: 630,
  },
  analytics: {
    // Google Analytics Tracking ID
    googleAnalyticsId: "G-4TYB77T6YM",
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

export const NAV_PAGES: NavigationPage[] = [
  { name: "Home", href: "/", current: null },
  { name: "Resume", href: "/resume", current: null },
  { name: "Portfolio", href: "/portfolio", current: null },
  { name: "Team", href: "/team", current: null },
  { name: "Contact", href: "/contact", current: null },
];

export interface SocialLink {
  name: string;
  href: string;
  imageUrl?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/demostheneslld", icon: FaGithub },
  {
    name: "StackOverflow",
    href: "https://stackoverflow.com/users/4005915/nathan-clement",
    icon: FaStackOverflow,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/njclement/",
    icon: FaLinkedin,
  },
  {
    name: "Medium",
    href: "https://articles.njclement.com/",
    icon: FaMedium,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/NathanJClement",
    icon: FaXTwitter,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/njclement.com",
    icon: FaBluesky,
  },
];

// ===========================
// Homepage Content
// ===========================

export const SELF_SUMMARY = {
  hero: {
    title: "Software Engineering",
    titleHighlight: true,
    subtitle: "Leader & Architect",
    description:
      "Building scaled SaaS platforms and leading engineering teams to deliver exceptional products.",
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
    description:
      "I'm always interested in new challenges and opportunities to build amazing products.",
    primaryButton: {
      text: "Get in Touch",
      href: "/contact",
    },
    secondaryButton: {
      text: "See My Work",
      href: "/portfolio",
    },
  },
  personal: {
    family: "I am married to the love of my life, Molly Voorhees. She was a farmer in the Pacific Northwest on one of the original Italian farms in the region. She is a nurse, business coordinator, event planner, and the kindest person I have ever met. We have two wonderful dogs named Palmer and Ellie. We met in High School, and after we both came home from college, reconnected, and have spent the years since building a life together. We have overcome massive health challenges, while traveling around the world to London, Italy, and all over the United States.",
    travels: "One of my formative experiences was traveling from Cairo to Cape Town during a semester break Junior year in college. My best friend and I traveled together on an absolutely tiny budget. We saw the pyramids right after the end of the Second Revolution in Egypt, went on a Safari in Kenya, climbed Kilimanjaro with a guide who has become a good friend, visited Victoria Falls, were abandoned by a bus driver at the border of Zambia, explored the deserts of Namibia, and went on a shark diving expedition with great whites in Gansbaai, South Africa. I have continued traveling with my wife, and believe that life is best lived in the pursuit of interesting experiences.",
    faith: "As a Christian, I believe that I have been gifted with abundant optimism and a deep sense of purpose. I am so grateful for life and all its challenges and joys.",
    health: "I was diagnosed with an extremely rare Liver Disease called Budd Chiari syndrome while the world was still reeling from the COVID pandemic. If not for my wife's intimate knowledge of the medical system in America, and her kindness, and self sacrificial kindness, plus the miracle of modern medicine combined with prayers from many friends and family across the church, I would not be here today. Luckily, I met incredible doctors, and ended up having a DIPS surgery, which has led to an amazing recovery. I am now able to live a full life, and am grateful for every day."
  },
  quote:
    "The Measure of a Man is not who he is, nor is it who he ought to be. It is the percentage of who he ought to be that he is.",
} as const;

export const bio = `I love solving problems...

During college, I discovered the power of automation during a final project for a class in Government. After spending hours filling a giant spreadsheet with data about social media footprints for hundreds of members of Congress, my hands were hurting from all the clicking, copying, and pasting. I knew there must be a better way. A few Google searches later, I built my first macro, changing the way I thought about work forever. I've spent the years since learning to code from the ground up, one project at a time.

I learned Full Stack Development while automating my first job, eventually building web applications, automating data processes, and creating interactive visualizations of information. Over time, I started working with a team of developers, and took a leadership role in more projects, until I eventually grew to manage a small engineering team: running sprint meetings, planning out architectural decisions, and coordinating tasks between developers.

Few things on Earth satisfy the soul like watching a vision come to life in the hands of a talented and engaged team. I crave that feeling and the fulfillment that comes with it, especially when pursuing objectives that inspire positive, meaningful change in the world, and in the lives of people.

Since the advent of Generative AI, I have stayed on the bleeding edge of the field, connecting with leading researchers, developers, and business leaders to build the future of AI. I am an active contributer towards of the successful AI Biz Hour podcast, and regularly speak and write about the quickly evolving landscape of AI.
`;

// ===========================
// Career & Experience
// ===========================

export interface CareerItem {
  name: string;
  description: string;
  href: string;
}

export const CAREER_ITEMS: CareerItem[] = [
  { name: "Dodgeball", description: "Enterprise Fraud Prevention Orchestration Platform", href: "/career/dodgeball.svg" },
  { name: "Printforia", description: "Enterprise Print on Demand as a Service", href: "/career/printforia.png" },
  { name: "EAP", description: "Enterprise Application Platform", href: "/career/eap.png" },
  { name: "LifePort", description: "Aerospace Manufacturing", href: "/career/lifeport.png" },
  { name: "Lockheed Martin", description: "Aerospace and Defense", href: "/career/lockheed-martin.png" },
  { name: "Facebook", description: "Social Media Platform", href: "/career/facebook.png" },
  { name: "US Congress", description: "Legislative Body", href: "/career/congress.png" },
];

// ===========================
// Technical Proficiencies
// ===========================

export interface TechnicalProficiency {
  name: string;
  description: string;
  tags: string[];
}

export const TECHNICAL_PROFICIENCIES: TechnicalProficiency[] = [
  /* ───────── AI & GENERATIVE MODELS ───────── */
  {
    name: "Claude Code",
    description: "AI-powered CLI for pair-programming and code generation",
    tags: ["AI & ML", "Developer Tools"],
  },
  {
    name: "Cursor",
    description: "AI-powered IDE for pair-programming with frontier models",
    tags: ["AI & ML", "Developer Tools"],
  },
  {
    name: "OpenAI",
    description: "GPT models, embeddings, and API integration for production systems",
    tags: ["AI & ML", "APIs"],
  },
  {
    name: "Frontier Models",
    description: "Hands-on orchestration of models from OpenAI, Anthropic, Google, etc.",
    tags: ["AI & ML"],
  },
  {
    name: "Agentic Workflows",
    description: "Designing multi-step agents that call tools and hit prod SLAs",
    tags: ["AI & ML", "Architecture"],
  },
  {
    name: "Multi-modal Prompt Engineering",
    description: "Blending text, vision, and structured data in a single prompt",
    tags: ["AI & ML"],
  },
  {
    name: "Model Context Protocol (MCP)",
    description: "Specification for creating deterministic context for LLMs",
    tags: ["AI & ML", "Protocols"],
  },
  {
    name: "Structured Outputs",
    description: "JSON-schema / type-guard techniques for reliable LLM responses",
    tags: ["AI & ML"],
  },

  /* ───────── MACHINE LEARNING ───────── */
  {
    name: "Python ML Stack",
    description: "Scikit-learn, Pandas, etc.",
    tags: ["AI & ML", "Python"],
  },
  {
    name: "Data Pipelines & ETL",
    description: "Managing data pipelines and ETL processes",
    tags: ["AI & ML", "Data Engineering"],
  },
  {
    name: "LLM-Enhanced Pipelines",
    description: "Generative preprocessing steps feeding feature stores",
    tags: ["AI & ML", "Data Engineering"],
  },
  {
    name: "AWS SageMaker",
    description: "Training, tuning, and hosting at scale",
    tags: ["AI & ML", "Cloud Platforms"],
  },

  /* ───────── PROGRAMMING LANGUAGES ───────── */
  {
    name: "TypeScript / JavaScript",
    description: "Full-stack apps, Node.js services, browser UIs",
    tags: ["Languages", "Frontend", "Backend"],
  },
  {
    name: "Python",
    description: "Data science, automation, backend APIs",
    tags: ["Languages", "Backend"],
  },
  { name: "C#", description: "Enterprise APIs with .NET Core", tags: ["Languages", "Backend"] },
  {
    name: "SQL",
    description: "Query optimisation across Postgres and other SQL databases",
    tags: ["Languages", "Database"],
  },
  {
    name: "HTML & CSS (LESS / SCSS)",
    description: "Responsive layouts, utility-first methodologies",
    tags: ["Languages", "Frontend"],
  },
  {
    name: "Shell / Bash",
    description: "Unix shell scripting, automation, and system administration",
    tags: ["Languages", "DevOps"],
  },

  /* ───────── BACKEND FRAMEWORKS ───────── */
  {
    name: "Node.js (Express / Fastify)",
    description: "High-throughput REST & event-driven services",
    tags: ["Backend", "JavaScript"],
  },
  { name: "Django", description: "Opinionated Python framework for rapid CRUD", tags: ["Backend", "Python"] },
  { name: ".NET Core", description: "Cross-platform APIs & background workers", tags: ["Backend", ".NET"] },
  {
    name: "TypeORM",
    description: "TypeScript ORM for SQL databases with decorators and migrations",
    tags: ["Backend", "Database", "TypeScript"],
  },
  {
    name: "Prisma",
    description: "Next-generation ORM with type-safe database access",
    tags: ["Backend", "Database", "TypeScript"],
  },

  /* ───────── FRONTEND FRAMEWORKS ───────── */
  {
    name: "React & Next.js",
    description: "SSR / SSG apps with TypeScript and React Query",
    tags: ["Frontend", "React"],
  },
  { name: "Vue 3", description: "Composition API & Pinia state management", tags: ["Frontend", "Vue"] },
  { name: "Angular", description: "Enterprise dashboards & admin portals", tags: ["Frontend", "Angular"] },

  /* ───────── DEVOPS & CLOUD ───────── */
  {
    name: "Docker & Kubernetes",
    description: "Containerisation and orchestration",
    tags: ["DevOps", "Containers"],
  },
  { name: "AWS", description: "VPC, Lambda, API Gateway, CloudWatch, S3, RDS, EKS, EC2, etc.", tags: ["DevOps", "Cloud Platforms"] },
  { name: "Microsoft Azure", description: "App Services, Functions, AD B2C, Key Vault", tags: ["DevOps", "Cloud Platforms"] },
  { name: "Terraform", description: "Infrastructure-as-Code", tags: ["DevOps", "Infrastructure"] },
  { name: "Cloudflare", description: "DNS, Hosting, CDN, WAF", tags: ["DevOps", "Cloud Platforms"] },
  { name: "NGINX", description: "Reverse proxy & load-balancing", tags: ["DevOps", "Infrastructure"] },

  /* ───────── CI/CD & TESTING ───────── */
  { name: "Git & GitHub", description: "Branch strategies & code-review workflows", tags: ["DevOps", "Developer Tools"] },
  { name: "GitHub Actions & CircleCI", description: "Automated build-test-deploy pipelines", tags: ["DevOps", "CI/CD"] },
  { name: "Playwright", description: "Cross-browser end-to-end testing", tags: ["Testing", "Quality Assurance"] },
  { name: "Artillery", description: "Load testing & performance baselining", tags: ["Testing", "Performance"] },
  { name: "Jest", description: "Unit and integration tests for TS/JS codebases", tags: ["Testing", "JavaScript"] },

  /* ───────── DATABASES & MESSAGING ───────── */
  { name: "PostgreSQL", description: "ACID-compliant relational database", tags: ["Database", "SQL"] },
  { name: "Cassandra", description: "Wide-column NoSQL for multi-region writes", tags: ["Database", "NoSQL"] },
  { name: "Redis", description: "In-memory cache, pub/sub, ephemeral queues", tags: ["Database", "Caching"] },
  { name: "RabbitMQ", description: "AMQP broker for reliable event delivery", tags: ["Database", "Messaging"] },
  { name: "Apache Kafka", description: "Distributed event streaming platform for high-throughput data pipelines", tags: ["Database", "Messaging", "Distributed Systems"] },
  { name: "Apache Zookeeper", description: "Centralized coordination service for distributed systems", tags: ["Database", "Distributed Systems"] },

  /* ───────── OBSERVABILITY & INCIDENT RESPONSE ───────── */
  { name: "Datadog", description: "APM, metrics, and logs for full-stack observability", tags: ["Observability", "Monitoring"] },
  { name: "Sentry", description: "Real-time error tracking with commit insights", tags: ["Observability", "Error Tracking"] },
  { name: "PagerDuty", description: "On-call scheduling and incident orchestration", tags: ["Observability", "Incident Response"] },

  /* ───────── SECURITY & AUTH ───────── */
  { name: "OAuth 2.0", description: "Authorization framework for delegated access", tags: ["Security", "Authentication"] },
  { name: "Auth0", description: "Identity-as-a-Service with enterprise SSO", tags: ["Security", "Authentication"] },
  { name: "JWT Tokens", description: "JSON Web Tokens for stateless authentication and authorization", tags: ["Security", "Authentication"] },
  { name: "Session Authentication", description: "Traditional server-side session management and cookies", tags: ["Security", "Authentication"] },
  {
    name: "Key Vaults",
    description: "Managed secrets storage (AWS Secrets Mgr, Azure Key Vault)",
    tags: ["Security", "Infrastructure"],
  },

  /* ───────── DESIGN & VISUALIZATION ───────── */
  { name: "Inkscape", description: "Vector illustration & SVG asset creation", tags: ["Design", "Creative Tools"] },
  { name: "GIMP", description: "Raster editing & photo compositing", tags: ["Design", "Creative Tools"] },
  { name: "Canva", description: "Cloud-based design platform for marketing materials and presentations", tags: ["Design", "Creative Tools"] },

  /* ───────── PLATFORM DEVELOPMENT ───────── */
  { name: "Shopify App Development", description: "Building apps for Shopify ecosystem with App Bridge and APIs", tags: ["Platform Development", "E-commerce"] },

  /* ───────── ARCHITECTURE & DESIGN PRINCIPLES ───────── */
  {
    name: "SOLID Principles",
    description: "SRP, OCP, LSP, ISP, DIP for maintainable OO design",
    tags: ["Architecture", "Best Practices"],
  },
  {
    name: "Design Patterns",
    description: "GoF creational / structural / behavioral patterns",
    tags: ["Architecture", "Best Practices"],
  },
  {
    name: "Singleton Pattern",
    description: "Ensuring single instance creation with global access point",
    tags: ["Architecture", "Design Patterns"],
  },
  {
    name: "Decorator Pattern",
    description: "Adding behavior to objects dynamically without altering structure",
    tags: ["Architecture", "Design Patterns"],
  },
  {
    name: "Repository Pattern",
    description: "Data access abstraction layer for domain-driven design",
    tags: ["Architecture", "Design Patterns"],
  },
  {
    name: "Microservices Architecture",
    description: "Service decomposition, bounded contexts, cross-cutting concerns",
    tags: ["Architecture", "Distributed Systems"],
  },
  {
    name: "Monolithic Architecture",
    description: "Single-tier software architecture with unified codebase",
    tags: ["Architecture", "System Design"],
  },
  {
    name: "Modular Monoliths",
    description: "Single deployable with strict internal domain boundaries",
    tags: ["Architecture", "System Design"],
  },
  {
    name: "Systemic Refactoring",
    description: "Incremental improvements guided by tests and metrics",
    tags: ["Architecture", "Code Quality"],
  },
  {
    name: "Enterprise-Grade Strategies",
    description: "Scalability, resilience, compliance for mission-critical SaaS",
    tags: ["Architecture", "Enterprise"],
  },
  {
    name: "CAP Theorem",
    description: "Consistency–Availability–Partition-tolerance trade-offs",
    tags: ["Architecture", "Distributed Systems"],
  },
  {
    name: "Data Migration",
    description: "Strategic data movement between systems with minimal downtime",
    tags: ["Architecture", "Database", "Data Engineering"],
  },
];


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

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
   {
    name: "AI Biz Hour",
    description: "Frequent guest on the AI Biz Hour podcast",
    link: "https://aibizhour.com/",
    imageUrl: "/portfolio/aibizhour.png",
    technologies: ["Podcast", "Speaking", "AI"],
    featured: true,
  },
  
  {
    name: "Articles on X",
    description: "Technical writing on X",
    link: "https://x.com/NathanJClement/articles",
    imageUrl: "/portfolio/x.png",
    technologies: ["X", "Technical Writing"],
    featured: true,
  },
  {
    name: "Articles on Medium",
    description: "Technical writing on Medium",
    link: "https://articles.njclement.com/",
    imageUrl: "/portfolio/medium.png",
    technologies: ["Medium", "Technical Writing"],
    featured: true,
  }, 
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

export const DEFAULT_RESUME_ITEMS: ContentItem[] = [
  new ContentItem({
    rendererKey: ContentRendererTypes.TITLE,
    content: {
      name: "Nathaniel J. Clement",
      email: "resume@njclement.com",
      website: "njclement.com",
      // address: 'Portland, OR | Vancouver, WA | Remote',
      phone: "phone upon request",
      summary:
        "Building Scaled SaaS Platforms | Proven Leader | Full-Stack Application Architect",
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.SECTION,
    content: { title: "Professional Experience" },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "Dodgeball",
      subtitle: "Enterprise Fraud Prevention Orchestration Platform",
      description: "Application Architect",
      location: "Remote",
      dateRange: "2023 - Present",
      items: [
        new ExperienceItem(
          "Lead the adoption of AI empowered processes, developement practices, testing, and feature development, including powerful features like Intelligent Labeling and the AI Second Opinion™"
        ),
        new ExperienceItem(
          "Architect full-stack SaaS fraud prevention platform at scale for enterprise customers"
        ),
        new ExperienceItem(
          "Develop public SDKs, External Customer Portal, workflow orchestration engine, and other systems for fraud detection and response pipelines"
        ),
      ],
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "NJC Enterprises",
      subtitle: "Software Architecture & Development Consulting",
      description: "Founder & Principal Engineer",
      location: "Remote",
      dateRange: "2015 - Present",
      items: [
        new ExperienceItem(
          "Designed and implemented mission-critical customer portal and internal integrations for an aerospace maintenance company."
        ),
        new ExperienceItem(
          "Deployed custom project tracking visualizations and management tooling for a large architecture firm"
        ),
      ],
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "Printforia",
      subtitle: "Enterprise Print on Demand as a Service",
      description: "Software Engineering Manager",
      location: "Remote",
      dateRange: "2020 - 2023",
      items: [
        new ExperienceItem(
          "Led engineering team, including sprint coordination, product/system design, and stakeholder management"
        ),
        new ExperienceItem(
          "Designed and implemented microservices architecture powering order intake, event management, routing, warehouse operations, and production automation"
        ),
        new ExperienceItem(
          "Created stateless service automating image processing: from metadata updates to whitespace optimization"
        ),
      ],
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "LifePort",
      subtitle: "Aerospace Manufacturing",
      description: "Software Architect",
      location: "Woodland, WA",
      dateRange: "2015 - 2020",
      items: [
        new ExperienceItem(
          "Architected and developed company-wide business intelligence platform achieving > 50% MAU company-wide"
        ),
        new ExperienceItem(
          "Built integrated systems for sales forecasting, vendor management, and EPA compliance tracking"
        ),
        new ExperienceItem(
          "Spearheaded modernization of company website and internal tools, emphasizing security and user experience"
        ),
      ],
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.SECTION,
    content: { title: "Business Expertise" },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "Leadership & Mentorship",
      subtitle:
        "Executive Communication, Corporate Strategy, Agile Project Management, Lean Six Sigma, Technical Hiring & Management",
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "Influential Books",
      subtitle:
        "5 Levels of Leadership, Extreme Ownership, Clean Code, Extreme Programming Explained, Death March, Agile Estimating and Planning, Meditations",
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.SECTION,
    content: { title: "Technical Expertise" },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "System Design",
      subtitle:
        "Distributed Systems, API Gateways, Microservices, Message Queues, Event-Driven Architecture, CQRS, Caching Strategies, High Availability, Machine Learning, ETL processes",
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "Languages",
      subtitle:
        "JavaScript/TypeScript, Python, Bash/Shell, C#, SQL, Go, HTML, CSS, and more...",
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "Infrastructure",
      subtitle: "Docker, Kubernetes, AWS, Azure, Terraform, Cloudflare, NGINX",
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "Backend",
      subtitle:
        "Node.js (Express, NestJS, TypeORM, Prisma), Python (Django, FastAPI), C# (.NET Core)",
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "Frontend",
      subtitle:
        "React, Next.js, Remix, Angular, Vue3, Tailwind, Vite, and more...",
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "DevOps",
      subtitle:
        "CI/CD (GitHub Actions, CircleCI), Monitoring (Sentry, Datadog), Alerting (PagerDuty), Logging (Datadog, AWS), Testing (Artillery, Playwright)",
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.SECTION,
    content: {
      title: "Travels",
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      subtitle:
        "Canada, Egypt, England, Ethiopia, Italy, Kenya, Mexico, Namibia, Scotland, South Africa, Tanzania, Zambia.",
    },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.SECTION,
    content: { title: "Education" },
  }),
  new ContentItem({
    rendererKey: ContentRendererTypes.EXPERIENCE,
    content: {
      title: "Harvard University",
      subtitle: "A.B. in Government and Psychology",
      location: "Cambridge, MA",
      dateRange: "2010 - 2014",
      items: [
        new ExperienceItem(
          "GPA: 3.56/4.00 | Varsity Men's Water Polo Team Member"
        ),
      ],
    },
  }),
];
