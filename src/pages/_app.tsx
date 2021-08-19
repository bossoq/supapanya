import '../styles/globals.css'
import 'bulma/css/bulma.min.css'
import { useEffect } from 'react'
import { SWRConfig } from 'swr'
import TagManager from 'react-gtm-module'
import Head from 'next/head'
import fetch from '../utils/fetchJson'
import { Header, Footer } from '../components/elements'
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'G-2VT2F5VNMY' })
    document.querySelector('body')?.classList.add('has-navbar-fixed-bottom')
  }, [])
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <div className="App">
        <Head>
          <title>สถาบันศุภปัญญาไอ.เค.</title>
          <meta property="og:title" content="สถาบันศุภปัญญาไอ.เค." />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:url" content="https://supapanya.com" />
          <meta property="og:type" content="website" />
          <meta
            name="discription"
            content="สถาบันกวดวิชาชั้นนำในย่านหนองแขม รองรับรูปแบบการสอนสดทางไกล มั่นใจในคุณภาพ ด้วยประสบการณ์กว่า 30 ปี"
          />
          <meta
            property="og:description"
            content="สถาบันกวดวิชาชั้นนำในย่านหนองแขม รองรับรูปแบบการสอนสดทางไกล มั่นใจในคุณภาพ ด้วยประสบการณ์กว่า 30 ปี"
          />
          {/* <meta name="thumbnail" content="%PUBLIC_URL%/images/screenshot.jpg" /> */}
          {/* <meta property="og:image" content="/images/screenshot.jpg" /> */}
          <meta property="og:locale" content="th_TH" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/favicon/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Header />
        <div className="mb-6 p-1">
          <Component {...pageProps} />
        </div>
        <Footer />
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "ad01d589166f4d13803a85faf5960849"}'
        ></script>
      </div>
    </SWRConfig>
  )
}

export default MyApp
