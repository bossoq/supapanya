/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { VideoJS } from '../components/elements'
import useUser from '../utils/useUser'
import fetchJson from '../utils/fetchJson'
import type { VideoList } from '../types/VideoJS'

const Portfolio = (): JSX.Element => {
  const [videoList, setVideoList] = useState<VideoList[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { user } = useUser({
    redirectTo: '/login',
    redirectIfFound: false
  })

  useEffect(() => {
    if (user) {
      fetchJson('/api/getvideo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoType: 'vod', userId: user.id }),
      }).then((response: { [k: string]: any }) => {
        const { complete, ...data } = response
        const list: VideoList[] = []
        if (complete) {
          Object.values(data).map((meta: VideoList) => {
            list.push(meta)
          })
          setVideoList(list)
          setIsLoading(false)
        }
      })
    }
  }, [user])
  return (
    <>
      <Head>
        <title>บันทึกการสอนออนไลน์สำหรับ {user && user.displayName}</title>
        <meta property="og:title" content="บันทึกการสอนออนไลน์ - สถาบันศุภปัญญาไอ.เค."
        />
      </Head>
      <div id="content" className="container pt-5 pb-5">
        <h1 className="is-size-1 has-text-weight-bold">บันทึกการสอนออนไลน์สำหรับ {user && user.displayName}</h1>
        {!isLoading && <VideoJS videoList={videoList} />}
      </div>
    </>
  )
}

export default Portfolio
