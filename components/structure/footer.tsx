import { socialLinks } from "../../config/constants";

const socialLinksJsx = socialLinks.map(socialLink => (
    <a key={socialLink.name} target='_blank' className='hover:underline' href={socialLink.href} rel="noreferrer">{socialLink.name}</a>
));

const Footer = () => {
    return (
      <div className='w-full bg-gray-100 text-gray-400 p-8 flex justify-between'>
        <div>© {new Date().getFullYear()} Nathaniel J. Clement, All Rights Reserved</div>
        <div className='flex gap-x-2'>
            {socialLinksJsx}
        </div>
      </div>
    )
}

export default Footer;