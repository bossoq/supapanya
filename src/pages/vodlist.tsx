import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import useUser from '../utils/useUser'
import fetchJson from '../utils/fetchJson'
import Table from '../components/elements/table'
import type { VideoList } from '../types/VideoJS'

const VodList = (): JSX.Element => {
  const [videoList, setVideoList] = useState<VideoList[]>([])
  const [videoKeys, setVideoKeys] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [admin, setAdmin] = useState<boolean>(false)

  const { user } = useUser({
    redirectTo: '/login',
    redirectIfFound: false,
  })

  useEffect(() => {
    if (user) {
      if (user.isLoggedIn) {
        setAdmin(user.meta.isAdmin)
      }
    }
  }, [user])

  useEffect(() => {
    fetchJson('/api/getvideo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ getAll: '*' }),
    }).then((response: Record<string, any>) => {
      const { complete, ...data } = response
      const list: VideoList[] = []
      const keys: string[] = []
      if (complete) {
        Object.values(data).map((meta: VideoList) => {
          list.push(meta)
        })
        Object.keys(data[0]).map((key: string) => {
          keys.push(key)
        })
        setVideoKeys(keys)
        setVideoList(list)
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <>
      <Head>
        <title>VOD Edit</title>
        <meta property="og:title" content="VOD Edit Dashboard" />
      </Head>
      {admin && (
        <div id="content" className="container pt-5 pb-5">
          <div className="columns is-flex is-align-items-center">
            <div className="column is-two-thirds">
              <h1 className="is-size-1 has-text-weight-bold">VOD Table</h1>
            </div>
            <div className="column is-one-third has-text-right">
              <Link href="/vodedit" passHref>
                <button className="button is-success">Add</button>
              </Link>
            </div>
          </div>
          {!isLoading && <Table headers={videoKeys} datas={videoList} />}
        </div>
      )}
    </>
  )
}

export default VodList
