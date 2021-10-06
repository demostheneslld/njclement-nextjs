import Head from 'next/head'

const Header = () => {
    return (
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta
            name="description"
            content={`Personal Site for Nathaniel J. Clement`}
          />
          <meta property="og:image" content={"/logo.png"} />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
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
        </Head>
      )
}

export default Header;