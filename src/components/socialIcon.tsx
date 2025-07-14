interface SocialIconProps {
  name: string;
  link: string;
  backgroundImageUrl?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const SocialIcon = ({ name, link, backgroundImageUrl, icon: IconComponent }: SocialIconProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
      <div
        className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-110 overflow-hidden bg-glass-elev1 backdrop-blur-md text-[color:var(--c-text-high)]"
      >
        {IconComponent ? (
          <IconComponent className="w-6 h-6 transition-colors text-[color:var(--c-text-med)] group-hover:text-ember" />
        ) : (
          <div 
            className="w-6 h-6 bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none' }}
          ></div>
        )}
      </div>
    </a>
  );
};

export default SocialIcon;