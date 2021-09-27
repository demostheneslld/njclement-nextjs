interface NavigationPage {
    name: string;
    href: string;
    current: boolean | null;
};

export const navigationPages: NavigationPage[] = [
    { name: 'About', href: '/', current: null },
    { name: 'Portfolio', href: '/portfolio', current: null },
    { name: 'Contact', href: '/contact', current: null },
];

interface SocialLink {
    name: string;
    href: string;
}

export const socialLinks: SocialLink[] = [
    { name: 'GitHub', href: 'https://github.com/demostheneslld'},
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nathanieljclement'},
    { name: 'StackOverflow', href: 'https://stackoverflow.com/users/4005915/nathan-clement'},
]

interface CareerItem {
    name: string;
    href: string;
}

export const careerItems: CareerItem[] = [
    { name: 'Printforia', href: '/career/printforia.png'},
    { name: 'EAP', href: '/career/eap.png'},
    { name: 'LifePort', href: '/career/lifeport.png'},
    { name: 'Lockheed Martin', href: '/career/lockheed-martin.png'},
    { name: 'Facebook', href: '/career/facebook.png'},
    { name: 'US Congress', href: '/career/congress.png'},
]