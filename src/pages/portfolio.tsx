/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { VideoJS } from '../components/elements'
import fetchJson from '../utils/fetchJson'
import type { VideoList } from '../types/VideoJS'

const Portfolio = (): JSX.Element => {
  const [videoList, setVideoList] = useState<VideoList[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchJson('/api/getvideo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoType: 'portfolio' }),
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
  }, [])
  return (
    <>
      <Head>
        <title>ความสำเร็จของเรา - สถาบันศุภปัญญาไอ.เค.</title>
        <meta property="og:title" content="ความสำเร็จของเรา - สถาบันศุภปัญญาไอ.เค."
        />
      </Head>
      <div id="content" className="container pt-5 pb-5">
        <h1 className="is-size-1 has-text-weight-bold">ความสำเร็จของเรา</h1>
        {!isLoading && <VideoJS videoList={videoList} />}
      </div>
    </>
  )
}

export default Portfolio
