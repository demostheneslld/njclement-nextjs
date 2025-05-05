"use client";

import PortfolioItem from '@/components/portfolioItem';
import Section from '@/components/ui/Section';
import { portfolioItems } from '@/config/constants';

const portfolioMessage = `
Most of my best work is done for private companies, and I am unable to share those projects publicly.
That being said, I have created a few projects in my spare time that I am able to list here!
`;

export default function PortfolioView() {
  return (
    <Section
      title="Portfolio"
      subtitle="A selection of projects I've built"
      background="gray"
      divider
    >
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-center">
        {portfolioMessage.trim().split('\n').map((line, index) => (
          <span key={index}>{line}<br /></span>
        ))}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {portfolioItems.map((item) => (
          <PortfolioItem key={`portfolio_${item.name}`} item={item} />
        ))}
      </div>
    </Section>
  );
}
