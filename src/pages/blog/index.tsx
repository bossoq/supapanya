import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import fetchJson from '../../utils/fetchJson'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import type { PostResponse } from '../../types/Blog'

const BlogIndex = (): JSX.Element => {
  const [postMeta, setPostMeta] = useState<PostResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [height, setHeight] = useState<number>(0)
  const headerRef = useRef<HTMLHeadingElement[]>([])

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
  })
  useEffect(() => {
    headerRef.current.forEach(({ offsetHeight }) => {
      if (offsetHeight > height) {
        setHeight(offsetHeight)
      }
    })
  }, [postMeta, height])

  const dateGenerator = (date: Date): string => {
    const dateObj = new Date(date)
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
      dateObj
    )
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dateObj)
    const da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(dateObj)
    return `${da} ${mo} ${ye}`
  }
  if (isLoading) {
    return (
      <>
        <Head>
          <title>บทความที่น่าสนใจ - สถาบันศุภปัญญาไอ.เค.</title>
          <meta property="og:title" content="บทความที่น่าสนใจ - สถาบันศุภปัญญาไอ.เค." />
        </Head>
        <div className="is-flex is-flex-direction-column p-5-c-desktop p-1-c mb-6">
          <section className="is-size-5 p-5-c-desktop p-1-c has-text-centered">
            <span className="is-size-1 has-text-weight-bold">
              Now Loading...
            </span>
            <progress className="progress is-medium is-primary" max="100">
              45%
            </progress>
          </section>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>บทความที่น่าสนใจ - สถาบันศุภปัญญาไอ.เค.</title>
          <meta property="og:title" content="บทความที่น่าสนใจ - สถาบันศุภปัญญาไอ.เค." />
        </Head>
        <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center px-6-c-desktop py-3-c-desktop p-1-c">
          {postMeta.map(
            ({
              /*authorId,*/ postDate,
              postTitle,
              postExcerpt,
              postLink,
              postPicture,
              id,
            }) => {
              return (
                <Link key={id} href={`/blog/${postLink}`} passHref>
                  <div className="blog-link is-flex is-flex-direction-column is-flex-grow-0">
                    <figure
                      className="image"
                      style={{ width: '100%', height: '30vh' }}
                    >
                      <Image
                        src={postPicture || ''}
                        alt={`picture for ${postTitle}`}
                        layout={'fill'}
                        objectFit={'cover'}
                      />
                    </figure>
                    <section className="py-2 has-text-grey has-text-centered">
                      <span className="icon-text">
                        <span className="icon">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <span>Supapanya</span>
                        <span className="ml-2-c-desktop ml-1-c">on</span>
                        <span className="icon">
                          <FontAwesomeIcon icon={faClock} />
                        </span>
                        <span>{postDate && dateGenerator(postDate)}</span>
                      </span>
                    </section>
                    <h2
                      ref={(h2) => h2 && headerRef.current.push(h2)}
                      className="is-size-3-desktop is-size-5 has-text-weight-bold"
                      style={height ? { height } : {}}
                    >
                      {postTitle}
                    </h2>
                    <p className="is-size-5-desktop is-size-6">{postExcerpt}</p>
                  </div>
                </Link>
              )
            }
          )}
        </div>
      </>
    )
  }
}

export default BlogIndex
