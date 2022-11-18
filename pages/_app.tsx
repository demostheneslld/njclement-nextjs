import 'tailwindcss/tailwind.css'
import Layout from '../components/structure/layout'
import '../public/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
