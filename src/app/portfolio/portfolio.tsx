"use client";

import PortfolioItem from '@/components/portfolioItem';
import { portfolioItems } from '@/config/constants';
import { ReactElement } from 'react';

const portfolioMessage = `
Most of my best work is done for private companies, and I am unable to share those projects publicly.
That being said, I have created a few projects in my spare time that I am able to list here!
`

const PortfolioView = (): ReactElement => {
  return (
    <div>
      <div>{portfolioMessage}</div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
        {portfolioItems.map((item) => (
          <PortfolioItem key={`portfolio_${item.name}`} name={item.name} description={item.description} link={item.link} backgroundImageUrl={item.imageUrl} />
        ))}
      </div>
    </div>
  )
}

export default PortfolioView;
