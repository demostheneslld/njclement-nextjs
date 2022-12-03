import { ContentItem } from "../types/pdf/ContentItem";
import { ExperienceItem } from "../types/pdf/ExperienceItem";
import { ContentRenderers, ContentRendererTypes } from "./pdfSetup";

interface NavigationPage {
  name: string;
  href: string;
  current: boolean | null;
}

export const navigationPages: NavigationPage[] = [
  { name: "About", href: "/", current: null },
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
        new ExperienceItem('Leadership responsibilities include: Sprint Planning and Management, Architectural Design Reviews, Stakeholder Feedback, Team 1 on 1s, Continuous Performance Evaluation and Feedback, Access Management for Internal Tools, Internal Tool Portfolio Management, Unblocking Team Members by Connecting them quickly to Correct Resources'),
        new ExperienceItem('Public API'),
        new ExperienceItem('Multiple Internal APIs'),
        new ExperienceItem('Internal Workers'),
        new ExperienceItem('Customer Portal'),
        new ExperienceItem('Order Management System'),
        new ExperienceItem('Warehouse Management System'),
        new ExperienceItem('Business Intelligence Dynamic SQL Manager + Reporting'),
        new ExperienceItem('Image Transformation Service'),
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
        new ExperienceItem('Aircraft Engine Maintenance Portal: Build and maintain automated usage tracking and invoicing application for a client. Over the years, this has become a central part of their business strategy, so I recruited and trained additional dev talent to provide consistent, redundant support.'),
        new ExperienceItem('WeveBeenEverywhere.com: Travel blog I built as a present for my wife. Includes Google Maps Integration and a simple user interface for creating customized multimedia posts.'),
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
        new ExperienceItem('Business Intelligence Dashboard'),
        new ExperienceItem('Collector Analysis'),
        new ExperienceItem('Vendor Notifications and Scorecards: Automation of emails for daily Late Order Reports, weekly Open PO Reports, and monthly Supplier Scorecards. This process sends up to 300 emails each time it runs, integrating data from across the company and providing it directly to our vendors with no human interaction required.'),
        new ExperienceItem('Employee Wellness Rewards Portal: Leveraged Internal API to quickly build a Wellness Rewards Program for Human Resources at LifePort. It includes customizable rewards activities, categories, teams, leaderboards, and profiles'),
        new ExperienceItem('LifePort.com: Rebuilt the external company website twice from the ground up, meeting requirements from marketing, leadership, legal, and information security teams'),
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
];