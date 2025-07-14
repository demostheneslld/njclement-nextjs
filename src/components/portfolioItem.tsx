import { PortfolioItem as PortfolioItemType } from "@/config/constants";
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import GlassCard from './ui/GlassCard';

interface PortfolioItemProps {
  item: PortfolioItemType;
}

export default function PortfolioItem({ item }: PortfolioItemProps) {
  return (
    <GlassCard as="a" href={item.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col justify-between h-full p-6">
      <div>
        <div 
          className="aspect-[4/3] bg-gray-100 rounded-lg mb-4 overflow-hidden"
        >
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover object-left transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-ember transition-colors duration-200" style={{color:'var(--c-text-high)'}}>
          {item.name}
        </h3>
        <p className="mb-4 text-sm leading-relaxed" style={{color:'var(--c-text-med)'}}>
          {item.description}
        </p>
      </div>
      <div className="mt-auto">
        {item.technologies && (
          <div className="flex flex-wrap gap-1 mb-4">
            {item.technologies.map((tech) => (
              <span 
                key={tech}
                className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center text-sm text-primary-600 group-hover:underline">
          Visit Site
          <HiArrowTopRightOnSquare className="ml-1 h-4 w-4" />
        </div>
      </div>
    </GlassCard>
  );
}