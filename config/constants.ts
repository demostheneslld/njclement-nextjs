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
