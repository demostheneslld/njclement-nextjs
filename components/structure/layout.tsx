import Header from './header';
import Footer from './footer';
import Navigation from './navigation';

export default function Layout({ children }) {
  return (
    <>
        <Header />
        <div className='flex flex-col items-center justify-top min-h-screen gap-y-8 text-gray-700 mt-6'>
            <img src='/logo.png' className='p-4 w-full max-w-xl'/>
            <div className='w-full max-w-3xl'>
                <Navigation></Navigation>
            </div>
            <div className='p-6'>
                <main>{children}</main>
            </div>
        </div>
        <Footer />
    </>
  )
}