import { ReactElement } from "react";

interface FadeInLogoProps {
    name: string;
    backgroundImageUrl: string;
}

const FadeInLogo = (props: FadeInLogoProps): ReactElement => {
    return (
      <div className='p-4 bg-gray-100 rounded filter grayscale hover:filter-none hover:bg-gray-200 transition-all duration-500'>
        <div 
          key={props.name} 
          className='h-20'
          style={{ backgroundImage: `url(${props.backgroundImageUrl})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
          title={props.name}
        >
        </div>
      </div>
    )
}

export default FadeInLogo;