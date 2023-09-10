import { Key, ReactElement } from "react";

const SocialIcon = (props: { link: string | URL | undefined; name: string | undefined; backgroundImageUrl: any; }): ReactElement => {

  function openLinkInNewTab() {
    window.open(props.link, '_blank');
  }

  return (
    <div onClick={openLinkInNewTab} className='bg-gray-100 rounded filter grayscale hover:filter-none transition-all duration-500 cursor-pointer'>
      <div 
        key={props.name} 
        className='h-8 w-10'
        style={{ backgroundImage: `url(${props.backgroundImageUrl})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        title={props.name}
      >
      </div>
    </div>
  )
}

export default SocialIcon;