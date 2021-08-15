import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

const Review = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>รีวิว - สถาบันศุภปัญญาไอ.เค.</title>
        <meta property="og:title" content="รีวิว - สถาบันศุภปัญญาไอ.เค." />
      </Head>
      <div id="content" className="container pt-5 pb-5">
        <h1 className="is-size-1 has-text-weight-bold">รีวิวจากผู้ปกครอง</h1>
        <h2 className="is-size-2 has-text-weight-semibold">
          ขอขอบพระคุณคุณแม่น้องเนม
        </h2>
        <div className="columns">
          <div className="column is-half">
            <Image
              src={
                'https://ceoyctjctahurvmlupfh.supabase.in/storage/v1/object/public/supapanya-assets/review-images/001-1.jpg'
              }
              alt={'review 1'}
              width={960}
              height={1707}
              layout={'responsive'}
            />
          </div>
          <div className="column is-half">
            <Image
              src={
                'https://ceoyctjctahurvmlupfh.supabase.in/storage/v1/object/public/supapanya-assets/review-images/001-2.jpg'
              }
              alt={'review 2'}
              width={960}
              height={1707}
              layout={'responsive'}
            />
          </div>
        </div>
        <section className="section pt-2">
          <p className="is-size-4 has-text-weight-medium is-italic">
            “ทางสถาบันศุภปัญญา ไอ.เค. ขอขอบพระคุณคุณแม่น้องเนม (ด.ช.พีระวิชญ์
            สังข์กลม) เป็นอย่างสูง ที่ให้ความไว้วางใจในสถาบันฯ ในการสนับสนุน
            อบรมสั่งสอน ทั้งด้านวิชาการ และด้านสังคม
            เพื่อให้น้องเนมเป็นทั้งคนเก่ง และคนดี ทั้งในครอบครัว โรงเรียน
            และประเทศ”
          </p>
        </section>
      </div>
    </>
  )
}

export default Review
