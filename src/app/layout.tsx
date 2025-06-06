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
        className="antialiased font-sans text-gray-800"
      >
        <div className="bg-stripe-grid absolute inset-0 opacity-[0.015] -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white -z-20"></div>
        
        <div className="flex flex-col min-h-screen">
          <header className="w-full py-6 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <img alt={`${siteConfig.name} Logo`} src="/logo.png" className="h-10 w-auto" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <Navigation />
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  <Button href="/contact" variant="secondary" size="sm">Contact</Button>
                </div>
                <div className="md:hidden">
                  <Navigation />
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-grow w-full">
            {children}
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}
