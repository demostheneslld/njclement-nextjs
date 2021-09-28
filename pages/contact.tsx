import Head from 'next/head'
import { ReactElement } from 'react'

const Portfolio = (): ReactElement => {
  return (
    <div>
      <Head>
        <title>Contact | Nathaniel J. Clement</title>
      </Head>
      <div><b>Email:</b> <a className='text-accent-800' href='mailto: inquiries@njclement.com'>inquiries@njclement.com</a></div>
    </div>
  )
}

export default Portfolio;
