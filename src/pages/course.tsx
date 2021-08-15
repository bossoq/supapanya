import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

const Course = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>คอร์สเรียน - สถาบันศุภปัญญาไอ.เค.</title>
        <meta property="og:title" content="คอร์สเรียน - สถาบันศุภปัญญาไอ.เค." />
      </Head>
      <div id="content" className="container pt-5 pb-5">
        <h1 className="is-size-1 has-text-weight-bold">คอร์สปิดเทอม 2563</h1>
        <div className="columns">
          <div className="column is-half">
            <h2 className="is-size-2 has-text-weight-semibold">
              คอร์สสอบเข้า ม.1
            </h2>
            <Image
              src={
                'https://ceoyctjctahurvmlupfh.supabase.in/storage/v1/object/public/supapanya-assets/course-images/Page Post 048-summer-Course63_3.jpg'
              }
              alt={'m1 course'}
              width={1000}
              height={1500}
              layout={'responsive'}
            />
          </div>
          <div className="column is-half">
            <h2 className="is-size-2 has-text-weight-semibold">
              คอร์สเสริมทักษะ (ประถม)
            </h2>
            <Image
              src={
                'https://ceoyctjctahurvmlupfh.supabase.in/storage/v1/object/public/supapanya-assets/course-images/Page Post 049-summer-Course63_4.jpg'
              }
              alt={'prathom course'}
              width={1000}
              height={1500}
              layout={'responsive'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Course
