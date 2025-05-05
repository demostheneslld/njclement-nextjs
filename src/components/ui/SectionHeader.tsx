interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  centered = true, 
  className = "" 
}: SectionHeaderProps) {
  return (
    <div className={`stripe-header ${centered ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className="text-gradient min-h-[60px]">{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
} 