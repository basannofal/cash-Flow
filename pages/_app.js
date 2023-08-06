import '@/styles/globals.css'
import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import 'boxicons/css/boxicons.min.css';


export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>Cash Flow</title>
     </Head>
    <Component {...pageProps} />
  </>
}
