import Head from 'next/head'

const Meta = () => {
    return (
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta
            name="description"
            content={`Personal Site for Nathaniel J. Clement`}
          />
          <meta property="og:image" content={"/logo.png"} />
        </Head>
      )
}

export default Meta;