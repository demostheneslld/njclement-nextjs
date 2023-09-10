import Script from 'next/script'
import 'tailwindcss/tailwind.css'
import '../public/globals.scss'

import type { AppProps } from 'next/app';
import Layout from '../components/structure/layout';

function MyApp({ Component, pageProps }: AppProps) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        id='google2'
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      />
      <Script
        id='google2'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
    
  )
}

export default MyApp
