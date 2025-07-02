/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/structure/footer";
import Navigation from "@/components/structure/navigation";
import Button from "@/components/ui/button";
import { siteConfig } from "@/config/constants";
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import './globals.css';

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.title}`,
  description: siteConfig.description,
  openGraph: {
    images: [siteConfig.openGraph.image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content={`Personal Site for ${siteConfig.name} - ${siteConfig.title}`}
        />
        <meta property="og:image" content={siteConfig.openGraph.image} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.analytics.googleAnalyticsId}');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning={true}
        className="antialiased font-sans text-gray-800 bg-bg-surface"
      >
        {/* Full-screen canvas background with retro grid */}
        <div className="bg-retro-grid fixed inset-0 opacity-[0.03] -z-10"></div>
        
        <div className="flex flex-col min-h-screen">
          {/* Win95-style navigation header */}
          <header className="nav-win95">
            <div className="flex items-center justify-between w-full max-w-none px-gutter">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/" className="flip-logo">
                  N ENTERPRISES
                </Link>
              </div>
              <div className="hidden md:block">
                <Navigation />
              </div>
              <div className="hidden md:flex items-center">
                <Button href="/contact" variant="primary" size="sm">Contact</Button>
              </div>
              <div className="md:hidden">
                <Navigation />
              </div>
            </div>
          </header>
          
          {/* Main content area - full-screen canvas */}
          <main className="flex-grow w-full">
            {children}
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}
