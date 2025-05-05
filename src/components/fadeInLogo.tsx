import { ReactElement } from "react";

interface FadeInLogoProps {
    name: string;
    backgroundImageUrl: string;
}

const FadeInLogo = ({ name, backgroundImageUrl }: FadeInLogoProps): ReactElement => {
    return (
      <div className="relative group overflow-hidden rounded-lg transition-all duration-300 hover:scale-105">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-30 group-hover:opacity-90 transition duration-500"></div>
        <div className="relative bg-white p-4 rounded-lg h-24 flex flex-col items-center justify-center">
          <div 
            className="w-full h-16 bg-center bg-contain bg-no-repeat transition-all duration-500 grayscale group-hover:grayscale-0"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          ></div>
          <div className="mt-2 text-xs text-center text-gray-600 group-hover:text-primary-700 font-medium transition duration-300">{name}</div>
        </div>
      </div>
    )
}

export default FadeInLogo;