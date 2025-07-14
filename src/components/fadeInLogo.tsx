import { ReactElement } from "react";

interface FadeInLogoProps {
    name?: string;
    backgroundImageUrl: string;
    description?: string;
}

const FadeInLogo = ({ name, backgroundImageUrl, description }: FadeInLogoProps): ReactElement => {
    return (
      <div className="relative group overflow-hidden rounded-lg transition-all duration-300 hover:scale-105">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-ember to-moss rounded-lg blur opacity-30 group-hover:opacity-90 transition duration-500"></div>
        <div className="relative p-3 rounded-lg h-32 flex flex-col bg-glass-elev1 backdrop-blur-md text-[color:var(--c-text-high)]">
          <div 
            className="w-full h-8 bg-center bg-contain bg-no-repeat transition-all duration-500 grayscale group-hover:grayscale-0"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          ></div>
          <hr className="border-t border-white/20 my-2" />
          <div className="flex flex-col justify-center flex-grow">
            {name && (
              <div className="text-xs text-center font-medium transition duration-300 group-hover:text-ember" style={{color:'var(--c-text-med)'}}>{name}</div>
            )}
            {description && (
              <div className="mt-1 text-xs text-center px-1 leading-tight" style={{color:'var(--c-text-low)'}}>
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
    )
}

export default FadeInLogo;