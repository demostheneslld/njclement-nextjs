import { ContentItem } from "../types/pdf/ContentItem";
import { ExperienceItem } from "../types/pdf/ExperienceItem";
import { ContentRendererTypes } from "./pdfSetup";

interface NavigationPage {
  name: string;
  href: string;
  current: boolean | null;
  target?: string;
}

export const navigationPages: NavigationPage[] = [
  { name: "About", href: "/", current: null },
  { name: "Articles", href: "https://articles.njclement.com/", current: null, target: '_blank' },
  { name: "Resume", href: "/resume", current: null },
  { name: "Portfolio", href: "/portfolio", current: null },
  { name: "Contact", href: "/contact", current: null },
];

interface SocialLink {
  name: string;
  href: string;
  imageUrl: string;
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/demostheneslld", imageUrl: "/social/github.png" },
  { name: "Twitter", href: "https://twitter.com/NathanJClement", imageUrl: "/social/twitter.png" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/nathanieljclement", imageUrl: "/social/linkedin.png" },
  {
    name: "StackOverflow",
    href: "https://stackoverflow.com/users/4005915/nathan-clement",
    imageUrl: "/social/stackoverflow.png"
  },
];

interface CareerItem {
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

interface TechnicalProficiency {
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

interface PortfolioItem {
  name: string;
  description: string;
  link: string;
  imageUrl: string;
}

const srcString = "src=njclement";

export const portfolioItems: PortfolioItem[] = [
  {
    name: "wevebeeneverywhere.com",
    description: "Travel Blog with Integrated Maps",
    link: `https://wevebeeneverywhere.com?${srcString}`,
    imageUrl: "/portfolio/wevebeeneverywhere.png",
  },
  {
    name: "Finance Tracker",
    description:
      "Fun tool experimenting with data visualizations and filters on a single html file with Javascript. If you paste data into the input that has the correct columns and data formats, it will generate filterable interactive charts.",
    link: `https://njclement.blob.core.windows.net/main/finance_tracker.html?${srcString}`,
    imageUrl: "/portfolio/financial-tracker.png",
  },
  {
    name: "Workday Clock",
    description:
      "Playing around with time in Javascript! Customize your personal workday clock and see the cash flow in :)",
    link: `https://njclement.blob.core.windows.net/main/workday_clock.html`,
    imageUrl: "/portfolio/workday-clock.png",
  },
  {
    name: "Hodl Calculator",
    description:
      "An experiment with market-cap based analysis of cryptocurrency prices",
    link: `https://njclement.blob.core.windows.net/main/hodl.html?${srcString}`,
    imageUrl: "/portfolio/hodl.png",
  },
  {
    name: "Cryptocurrency Max Value Calculator",
    description:
      "A simpler version of the Hodl Calculator. Uses market-cap to estimate max values for different cryptos",
    link: `https://njclement.blob.core.windows.net/main/cryptocurrency_value.html?${srcString}`,
    imageUrl: "/portfolio/crypto-value.png",
  },
];

export const defaultResumeItems: ContentItem[] = [
  new ContentItem(
    ContentRendererTypes.TITLE,
    {
      name: 'Nathaniel J. Clement',
      email: 'resume@njclement.com',
      website: 'njclement.com',
      address: 'Portland, OR | Vancouver, WA | Remote | Hybrid',
      phone: 'phone upon request',
      summary: 'Experienced Software Engineer, Architect, and Leader',
    },
  ),
  new ContentItem(
    ContentRendererTypes.SECTION,
    'Academic History'
  ),
  new ContentItem(
    ContentRendererTypes.EXPERIENCE,
    {
      title: 'Harvard University',
      subtitle: 'A.B. in Government and Psychology: 3.56/4.00 GPA.',
      location: 'Cambridge, MA',
      dateRange: '2010 - 2014',
      items: [
        new ExperienceItem('Coursework: Data Science, Computer Science, Statistics, Cyberpolitics, Economics, Polling, and Psychology'),
        new ExperienceItem('Varsity Men\'s Water Polo. Dedicated 10-30+ hours weekly to the team as a utility player for three seasons'),
      ]
    },
  ),
  new ContentItem(
    ContentRendererTypes.SECTION,
    'Relevant Career Experience'
  ),
  new ContentItem(
    ContentRendererTypes.EXPERIENCE,
    {
      title: 'Printforia',
      subtitle: 'Print on Demand as a Service',
      description: 'Roles: Software Engineering Manager << Software Engineer',
      location: 'Vancouver, WA',
      dateRange: 'Started 2020',
      items: [
        new ExperienceItem('Leadership responsibilities include sprint coordination, architectural design review, stakeholder feedback, 1 on 1s, continuous performance evaluation, quickly unblocking team members, and internal tool management.'),
        new ExperienceItem('Public API: Allows customers to submit orders to our OMS, and receive webhooks with live order updates'),
        new ExperienceItem('Multiple Internal APIs: These APIs power various internal applications and capabilities'),
        new ExperienceItem('Internal Workers: VM workers providing utility to our system, whether by processing payments, transferring art files, managing inventory, or routing orders.'),
        new ExperienceItem('Customer Portal: Secure portal where customers view order information, stats, and inventory status. Enables custom product configuration and purchase with payment integration'),
        new ExperienceItem('Order Management System: Empowers operations staff to view, manage, analyze, approve, route, and cancel orders. Admins can manage complex configurations for pricing, shipping, product settings, customers, and more.'),
        new ExperienceItem('Warehouse Management System: Receives Sales Orders, generates Fulfillments + Work Orders, and manages the production process on API connected production machines.'),
        new ExperienceItem('Business Intelligence Dynamic SQL Manager + Reporting', { visible: false }),
        new ExperienceItem('Image Transformation Service: Stateless API to transform images. Functions include metadata modification, size + resolution adjustment, detection/trimming of transparent pixels, centroid calculation, and more.'),
      ]
    },
  ),
  new ContentItem(
    ContentRendererTypes.EXPERIENCE,
    {
      title: 'NJC Enterprises',
      subtitle: 'Software Consulting',
      description: 'Roles: Founder',
      location: 'Portland, OR',
      dateRange: 'Started 2015',
      items: [
        new ExperienceItem('Aircraft Engine Maintenance Portal: Automated usage tracking and invoicing application. Over the years, this has become a central part my client\'s business strategy, so I recruited and trained additional dev talent to provide consistent, redundant support.'),
        new ExperienceItem('WeveBeenEverywhere.com: Travel blog I built as a present for my wife. Includes Google Maps Integration and a simple user interface for creating customized multimedia posts.', { visible: false }),
      ]
    },
  ),
  new ContentItem(
    ContentRendererTypes.EXPERIENCE,
    {
      title: 'LifePort',
      subtitle: 'Aerospace Manufacturing in Medical, Defense, and VIP Markets',
      description: 'Roles: Software Architect << Full Stack Developer << Senior Analyst',
      location: 'Woodland, WA',
      dateRange: '2015 - 2020',
      items: [
        new ExperienceItem('Internal API: This API Powered all internal tools that I built for LifePort'),
        new ExperienceItem('Business Intelligence Dashboard: Live internal dashboard integrating diverse sources of company data into a single, interactive, visual tool. Over 50% of employees were MAU. Pages received 165 weekly views/employee on average'),
        new ExperienceItem('Collector Analysis: Automated process integrating revenue, shipments, backlog, and sales funnel data into an overall financial projection. Integrates with the Business Intelligence Dashboard.'),
        new ExperienceItem('Vendor Notifications and Scorecards: Automated emails for daily Late Order Reports, weekly Open PO Reports, and monthly Supplier Scorecards. Sent hundreds of emails per run, integrating data from across the company and securely providing it to vendors without requiring human interaction.'),
        new ExperienceItem('Employee Wellness Rewards Portal: Leveraged Internal API to quickly build a Wellness Rewards Program for Human Resources at LifePort. It includes customizable rewards activities, categories, teams, leaderboards, and profiles', {visible: false}),
        new ExperienceItem('LifePort.com: Rebuilt the external company website twice from the ground up, meeting requirements from marketing, leadership, legal, and information security teams', { visible: false }),
        new ExperienceItem('EPA Emissions Tracker: Coordinated with business teams and shop floor personnel to electrify paper tracking of Hazardous and Toxic air Pollutants for EPA compliance. Emphasized User Experience for those uncomfortable with computers'),
      ]
    },
  ),
  new ContentItem(
    ContentRendererTypes.EXPERIENCE,
    {
      title: 'Facebook',
      subtitle: 'Government and Politics Team',
      description: 'Roles: Summer Extern via ZeroChaos',
      location: 'Washington, DC',
      dateRange: '2013 - 2014',
      items: [
        new ExperienceItem('Reduced time required to pull data, analyze trends, and prepare page insight publications by 5+ hours per client'),
        new ExperienceItem('Certified over 3k official pages for domestic and international politicians during verified political pages rollout'),
      ]
    },
    { visible: false, },
  ),
  new ContentItem(
    ContentRendererTypes.SECTION,
    'Additional Experience'
  ),
  new ContentItem(
    ContentRendererTypes.EXPERIENCE,
    {
      title: 'Travels',
      subtitle: 'Canada, Egypt, England, Ethiopia, Kenya, Mexico, Namibia, Scotland, South Africa, Tanzania, Zambia.',
    },
  ),
  new ContentItem(
    ContentRendererTypes.SECTION,
    'Favorite Frameworks and Tools'
  ),
  new ContentItem(
    ContentRendererTypes.EXPERIENCE,
    {
      title: 'Backend',
      subtitle: 'Node.js, Express.js, TypeORM, Relational Data, Document Data, Django, Flask, .NET Core, Shell, Cron',
    },
  ),
  new ContentItem(
    ContentRendererTypes.EXPERIENCE,
    {
      title: 'Frontend',
      subtitle: 'Tailwind, Vue3, Angular, React, AmCharts, AgGrid, Next.js',
    },
  ),
  new ContentItem(
    ContentRendererTypes.EXPERIENCE,
    {
      title: 'DevOps',
      subtitle: 'Agile Principles, Docker, Kubernetes, GitHub Actions, CircleCI, Azure, Jest, Postman',
    },
  ),
  new ContentItem(
    ContentRendererTypes.EXPERIENCE,
    {
      title: 'Languages',
      subtitle: 'Typescript/JavaScript, Python, C#, Bash/Shell, SQL, HTML/CSS',
    },
  ),
];