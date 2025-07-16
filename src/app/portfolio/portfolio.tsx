"use client";

import PortfolioItem from '@/components/portfolioItem';
import Section from '@/components/ui/Section';
import { PORTFOLIO_ITEMS } from '@/config/constants';

const portfolioMessage = `
My best work is usually done for private companies, and I am unable to share those projects publicly. That being said, I have created a few projects in my spare time that I am able to list here!
`;

export default function PortfolioView() {
  return (
    <Section
      title="Portfolio"
      subtitle="What am I working on in my spare time?"
      background="accent"
      divider
    >
      <p className="text-lg max-w-3xl mx-auto mb-12 text-center" style={{color:'var(--c-text-med)'}}>
        {portfolioMessage.trim().split('\n').map((line, index) => (
          <span key={index}>{line}<br /></span>
        ))}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {PORTFOLIO_ITEMS.map((item) => (
          <PortfolioItem key={`portfolio_${item.name}`} item={item} />
        ))}
      </div>
    </Section>
  );
}
