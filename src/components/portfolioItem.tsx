import { ReactElement } from "react";

interface PortfolioItemProps {
  name: string;
  description: string;
  link: string;
  backgroundImageUrl: string;
}

const PortfolioItem = (props: PortfolioItemProps): ReactElement => {

  function openLinkInNewTab() {
    window.open(props.link, '_blank');
  }

  return (
    <div onClick={openLinkInNewTab} className='p-4 bg-gray-100 rounded filter grayscale hover:filter-none transition-all duration-500 cursor-pointer'>
      <div className='text-gray-800 font-semibold'>{props.name}</div>
      <div className='italic'>{props.description}</div>
      <div 
        key={props.name} 
        className='h-60 bg-white mt-4'
        style={{ backgroundImage: `url(${props.backgroundImageUrl})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        title={props.name}
      >
      </div>
    </div>
  )
}

export default PortfolioItem;