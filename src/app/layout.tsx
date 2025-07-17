/* eslint-disable @next/next/no-img-element */
import Logo from "@/components/logo";
import Footer from "@/components/structure/footer";
import Navigation from "@/components/structure/navigation";
import Section from "@/components/ui/Section";
import { siteConfig } from "@/config/constants";
import { BiomeProvider } from "@/contexts/BiomeContext";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
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
        className="font-body"
      >
        <BiomeProvider>
          <div className="flex flex-col min-h-screen">
            <header className="w-full sticky top-0 z-40 bg-glass-elev2 backdrop-blur-xl" data-testid="main-header">
              <div className="glass-surface ">
                <div className="flex items-center justify-between py-4">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/" className="text-accent" aria-label="Home" data-testid="logo-link">
                      <Logo className="h-10 w-auto" />
                    </Link>
                  </div>
                  <Navigation />
                </div>
              </div>
            </header>
            
            <main className="flex-grow w-full">
              {children}
            </main>
            <Section background="neutral" className="py-16" divider>
              <Footer />
            </Section>
          </div>
        </BiomeProvider>
      </body>
    </html>
  );
}
