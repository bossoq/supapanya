import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import fetchJson from '../utils/fetchJson'
import { VideoJS } from '../components/elements'
import type { PostResponse } from '../types/Blog'

const Home = (): JSX.Element => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const showPopups = () => {
    setShowPopup(!showPopup)
  }

  const [postMeta, setPostMeta] = useState<PostResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    fetchJson('/api/getpost', {
      method: 'GET',
    }).then((response: { [k: string]: any }) => {
      const { complete, ...data } = response
      const list: PostResponse[] = []
      if (complete) {
        Object.values(data).map((meta: PostResponse) => {
          list.push(meta)
        })
        setPostMeta(list)
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <div id="content" className="container pt-5 pb-5">
      {showPopup && <div id="detail" className="image-container is-flex is-flex-direction-column has-background-white" style={{ zIndex: 999 }}>
        <button className="delete is-large" onClick={showPopups}></button>
        <VideoJS videoList={[{ idx: 0, name: 'New Normal Supapanya', baseUrl: 'https://vod.supapanya.com/NewNormal_Promote-FullHD', type: 'homepage', allowAll: true }]} />
      </div>}
      <div className="card">
        <div className="card-image">
          <figure
            className="image"
            style={{ height: '430px', filter: 'brightness(50%)' }}
          >
            <Image
              src={'/images/home.jpg'}
              alt={'Classroom'}
              layout={'fill'}
              objectFit={'cover'}
              objectPosition={'100% 12%'}
            />
          </figure>
        </div>
        <div className="card-content is-overlay is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered">
          <h1 className="is-size-1 is-size-1-tablet is-size-2-mobile is-bigger has-text-weight-bold mb-3">
            สถาบันศุภปัญญาไอ.เค.
          </h1>
          <p className="is-size-4 is-size-5-touch has-text-light is-italic mb-3">
            สถาบันกวดวิชาที่มีประสบการณ์การสอนกว่า 30 ปี
            ส่งต่อความสำเร็จให้นักเรียนจากรุ่นสู่รุ่น
          </p>
          <p className="is-size-4 is-size-5-touch has-text-light is-italic mb-3">
            มั่นใจได้ว่าสถาบันศุภปัญญาไอ.เค.
            คือสถาบันกวดวิชาที่ดีที่สุดในย่านหนองแขม
          </p>
          <p className="is-size-4 is-size-5-touch has-text-light has-text-weight-semibold is-italic">
            “วันนี้ระบบการสอนสดออนไลน์ของเราพร้อมแล้ว ด้วยความคมชัด Full HD
            พร้อมวิดีโอย้อนหลังกว่า <u>300</u> วิดีโอ”
          </p>
        </div>
      </div>
      <div className="is-flex is-flex-direction-column py-4">
        <h2 className="is-size-3 is-size-4-mobile has-text-weight-bold">วิดีโอที่น่าสนใจ</h2>
        <div className="columns">
          <div className="column is-one-third-desktop is-full-mobile has-text-centered">
            <a onClick={showPopups}>
              <figure className="image" style={{ height: '25vh' }}>
                <Image src={'https://vod.supapanya.com/NewNormal_Promote-FullHD/cover.jpg'} alt={'new normal supapanya'} layout={'fill'} objectFit={'contain'} />
              </figure>
              <p className="has-text-black">New Normal Supapanya</p>
            </a>
          </div>
          <div className="column is-one-third-desktop is-full-mobile has-text-centered">
            <Link href='/studytips' passHref>
              <a>
                <figure className="image" style={{ height: '25vh' }}>
                  <Image src={'https://vod.supapanya.com/Factorial-ForHLS+Dash/cover.jpg'} alt={'new normal supapanya'} layout={'fill'} objectFit={'contain'} />
                </figure>
                <p className="has-text-black">เกร็ดความรู้</p>
              </a>
            </Link>
          </div>
          <div className="column is-one-third-desktop is-full-mobile has-text-centered">
            <Link href='/portfolio' passHref>
              <a>
                <figure className="image" style={{ height: '25vh' }}>
                  <Image src={'https://vod.supapanya.com/M4-20-HLSNew/cover.jpg'} alt={'new normal supapanya'} layout={'fill'} objectFit={'contain'} />
                </figure>
                <p className="has-text-black">ความสำเร็จของเรา</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="is-flex is-flex-direction-column py-4">
        <h2 className="is-size-3 is-size-4-mobile has-text-weight-bold">บทความล่าสุด</h2>
        <div className="columns">
          {!isLoading && postMeta.reverse().slice(0,3).map(({ postTitle, postLink, postPicture, id }) => {
            return (
              <div key={`div_${id}`} className="column is-one-third-desktop is-full-mobile has-text-centered">
                <Link key={`link_${id}`} href={`/blog/${postLink}`} passHref>
                  <a key={`a_${id}`}>
                    <figure key={`fig_${id}`} className="image" style={{ height: '25vh' }}>
                      <Image key={`img_${id}`} src={postPicture || ''} alt={'new normal supapanya'} layout={'fill'} objectFit={'contain'} />
                    </figure>
                    <p key={`p_${id}`} className="has-text-black">{postTitle}</p>
                  </a>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
