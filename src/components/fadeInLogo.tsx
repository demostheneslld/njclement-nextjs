import { ReactElement } from "react";

interface FadeInLogoProps {
    name?: string;
    backgroundImageUrl: string;
    description?: string;
}

const FadeInLogo = ({ name, backgroundImageUrl, description }: FadeInLogoProps): ReactElement => {
    return (
      <div className="relative group overflow-hidden rounded-lg transition-all duration-300 hover:scale-105">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-30 group-hover:opacity-90 transition duration-500"></div>
        <div className="relative bg-white p-3 rounded-lg h-32 flex flex-col">
          <div 
            className="w-full h-8 bg-center bg-contain bg-no-repeat transition-all duration-500 grayscale group-hover:grayscale-0"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          ></div>
          <hr className="border-t border-gray-200 my-2" />
          <div className="flex flex-col justify-center flex-grow">
            {name && (
              <div className="text-xs text-center text-gray-600 group-hover:text-primary-700 font-medium transition duration-300">{name}</div>
            )}
            {description && (
              <div className="mt-1 text-xxs text-center text-gray-400 group-hover:text-gray-500 transition duration-300 px-1 leading-tight">
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
    )
}

export default FadeInLogo;