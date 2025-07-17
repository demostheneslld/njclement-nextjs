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
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-contrast rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
      <div
        className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-110 overflow-hidden bg-glass-elev1 backdrop-blur-md text-high"
      >
        {IconComponent ? (
          <IconComponent className="w-5 h-5 flex-shrink-0 transition-colors text-high group-hover:text-accent" />
        ) : (
          <div 
            className="w-5 h-5 bg-center bg-contain bg-no-repeat flex-shrink-0"
            style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none' }}
          ></div>
        )}
      </div>
    </a>
  );
};

export default SocialIcon;