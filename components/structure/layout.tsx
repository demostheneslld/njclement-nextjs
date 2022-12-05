import Header from './header';
import Footer from './footer';
import Navigation from './navigation';
import Script from 'next/script';

export default function Layout({ children }) {
  return (
    <>
        <Header />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          id='google2'
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script
          id='google2'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <div className='flex flex-col items-center justify-top min-h-screen gap-y-8 text-gray-700 mt-6'>
            <img alt='Logo Image' src='/logo.png' className='p-4 w-full max-w-xl'/>
            <div className='w-full max-w-3xl'>
                <Navigation></Navigation>
            </div>
            <div className='p-6'>
                <main>{children}</main>
            </div>
        </div>
        <Footer />
    </>
  )
}