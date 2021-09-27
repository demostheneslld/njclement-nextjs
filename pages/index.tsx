import Head from 'next/head'
import { careerItems } from '../config/constants'

const biography = `I love solving problems. During college, I discovered the power of automation during a final project for a class in Government. I had spent hours building a giant Excel spreadsheet with hundreds of members of congress and their social media pages, and was getting sick of clicking, copying, and pasting. I knew there must be a better way, and after a couple Google searches, discovered how to build my first macro. I've spent the years since learning to code from the ground up, one project at a time. These days, I enjoy building web applications, automating data processes, and creating interactive visualizations of information.`

export default function Home() {
  return (
    <>
      <Head>
        <title>About | Nathaniel J. Clement</title>
      </Head>
      <div className='flex flex-col items-center gap-y-6'>
        <div className='max-w-3xl w-full bg-gray-100 rounded'>
          <img className='max-w-sm w-full rounded-full p-8 m-auto' src='/profile.png' />
          <div className='max-w-sm w-full text-gray-400 px-8 pb-8 italic text-center m-auto'>The Measure of a Man is not who he is, nor is it who he ought to be. It is the percentage of who he ought to be that he is.</div>
          <div className='bg-gray-200 w-full p-2 text-center rounded-b'>Nathaniel J. Clement</div>
        </div>
        <div className='max-w-3xl w-full text-justify'>
          <h1 className='underline text-gray-900 mb-4'>Biography</h1>
          <div>{biography}</div>
        </div>
        <div className='max-w-3xl w-full text-justify'>
          <h1 className='underline text-gray-900 mb-4'>Education</h1>
          <div className='flex p-4 bg-gray-100 gap-x-4 rounded'>
            <img className='w-36' src='/harvard-logo.png' />
            <div className='flex-col my-auto'>
              <div>Class of 2014</div>
              <div>A.B. Degree in Government with Secondary in Psychology</div>
              <div>Coursework in Computer Science including Data Science and Statistics</div>
              <div>3 Years Varsity Water Polo</div>
            </div>
          </div>
        </div>
        <div className='max-w-3xl w-full text-justify'>
          <h1 className='underline text-gray-900 mb-4'>Career</h1>
          <div className='mb-4'>Over the years, I have had the privilege of working with incredible companies, including the following...</div>
          <div className=''>
            {careerItems.map((item) => (
              <div key={item.name} className='float-left p-4 mr-4 mb-4 bg-gray-100 rounded'>
                <img title={item.name} className='h-20' src={item.href} />
              </div>
            ))}
          </div>
        </div>
        <div className='max-w-3xl w-full text-justify'>
          <h1 className='underline text-gray-900 mb-4'>Technical Proficiencies</h1>
          {/* <div className=''>
            {careerItems.map((item) => (
              <div key={item.name} className='float-left p-4 mr-4 mb-4 bg-gray-100 rounded'>
                <img title={item.name} className='h-20' src={item.href} />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  )
}
