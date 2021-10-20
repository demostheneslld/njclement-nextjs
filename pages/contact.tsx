import Head from 'next/head'
import { ReactElement } from 'react'

const Portfolio = (): ReactElement => {
  return (
    <div>
      <Head>
        <title>Contact | Nathaniel J. Clement</title>
      </Head>
      <div><i>I am not currently accepting new work in order to reserve capacity for my full time employer.</i></div>
      <div><b>Email:</b> <a className='text-accent-800' href='mailto: inquiries@njclement.com'>inquiries@njclement.com</a></div>
    </div>
  )
}

export default Portfolio;
