import Head from 'next/head'
import FadeInLogo from '../components/fadeInLogo'
import SocialIcon from '../components/socialIcon'
import { careerItems, technicalProficiencies, socialLinks } from '../config/constants'
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export async function getStaticProps() {
  const bioMarkdown = await import(`../config/markdown/bio.md`);
  const bioMarkdownData = matter(bioMarkdown.default);
  const props = {
    biography: {
      frontmatter: bioMarkdownData.data,
      markdownBody: bioMarkdownData.content,
    }
  };
  return {props};
}

export default function Home(props) {
  return (
    <>
      <Head>
        <title>About | Nathaniel J. Clement</title>
      </Head>
      <div className='flex flex-col items-center gap-y-6'>
        <div className='max-w-3xl w-full rounded flex flex-col gap-y-8'>
          <img alt='Profile Image' className='max-w-xs w-full rounded-full m-auto' src='/profile.png' />
          <div className='max-w-sm w-full text-gray-400 px-8 italic text-center m-auto'>The Measure of a Man is not who he is, nor is it who he ought to be. It is the percentage of who he ought to be that he is.</div>
          <div className='bg-gray-100 text-gray-600 w-full p-2 text-center rounded flex flex-col gap-2'>
            <div className='text-4xl'>Nathaniel J. Clement</div>
            <hr/>
            <div className='flex items-center gap-2 justify-center'>
              {socialLinks.map((item) => (
                <SocialIcon 
                  key={`portfolio_${item.name}`} 
                  name={item.name} 
                  description={null} 
                  link={item.href} 
                  backgroundImageUrl={item.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='max-w-3xl w-full'>
          <h1 className='underline text-gray-900 mb-4'>Biography</h1>
          <ReactMarkdown>{props.biography.markdownBody}</ReactMarkdown>
        </div>
        <div className='max-w-3xl w-full filter grayscale hover:filter-none transition-all duration-500'>
          <h1 className='underline text-gray-900 mb-4'>Education</h1>
          <div className='flex py-4 pr-2 bg-gray-100 gap-x-4 rounded'>
            <div className='w-36' style={{ backgroundImage: `url(/harvard-logo.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
            <div className='flex-col my-auto'>
              <div>Class of 2014</div>
              <div>A.B. Degree in Government with Secondary in Psychology</div>
              <div>Coursework in Computer Science including Data Science and Statistics</div>
              <div>3 Years Varsity Water Polo</div>
            </div>
          </div>
        </div>
        <div className='max-w-3xl w-full'>
          <h1 className='underline text-gray-900 mb-4'>Career</h1>
          <div className='mb-4'>Over the years, I have had the privilege of working for incredible organizations, including the following...</div>
          <div className='grid grid-cols-3 gap-4'>
            {careerItems.map((item) => (
              <FadeInLogo key={`career_${item.name}`} name={item.name} backgroundImageUrl={item.href} />
            ))}
          </div>
        </div>
        <div className='max-w-3xl w-full'>
          <h1 className='underline text-gray-900 mb-4'>Technical Proficiencies</h1>
          {Object.keys(technicalProficiencies).map((category) => (
            <div key={`tech_category_${category}`}>
              <h2 className='mb-4 mt-8'>{category}</h2>
              <div className='grid grid-cols-3 gap-4'>
                {technicalProficiencies[category].map((item) => (
                  <FadeInLogo key={`tech_item_${item.name}`} name={item.name} backgroundImageUrl={item.href} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
