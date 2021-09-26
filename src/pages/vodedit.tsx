import { useRouter } from 'next/router'
import Head from 'next/head'
import VodEdit from '../components/elements/videoEdit'

const VodEditor = (): JSX.Element => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Video Edit - Admin Panel - สถาบันศุภปัญญาไอ.เค.</title>
        <meta
          property="og:title"
          content="Video Edit - Admin Panel - สถาบันศุภปัญญาไอ.เค."
        />
      </Head>
      <VodEdit data={router.query} />
    </>
  )
}

export default VodEditor
