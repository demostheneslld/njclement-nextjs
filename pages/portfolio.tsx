import Head from 'next/head'
import { ReactElement } from 'react'
import PortfolioItem from '../components/pages/portfolio/PortfolioItem'
import { portfolioItems } from '../config/constants'

const portfolioMessage = `
Most of my best work is done for private companies, and I am unable to share those projects publicly.
That being said, I have created a few projects in my spare time that I am able to list here!
`

const Portfolio = (): ReactElement => {
  return (
    <div>
      <Head>
        <title>Portfolio | Nathaniel J. Clement</title>
      </Head>
      <div>{portfolioMessage}</div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
        {portfolioItems.map((item) => (
          <PortfolioItem key={`portfolio_${item.name}`} name={item.name} description={item.description} link={item.link} backgroundImageUrl={item.imageUrl} />
        ))}
      </div>
    </div>
  )
}

export default Portfolio;
