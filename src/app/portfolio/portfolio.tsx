import PortfolioItem from '@/components/portfolioItem';
import Section from '@/components/ui/Section';
import { PORTFOLIO_ITEMS } from '@/config/constants';

const portfolioMessage = `
Our best work is usually done for private companies; however, here are some places Nathan has been featured: sharing his work, journey, and perspective.
`;

export default function PortfolioView() {
  return (
    <Section
      title="Media"
      background="accent"
      divider
    >
      <p className="text-lg max-w-3xl mx-auto mb-12 text-center text-white">
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
