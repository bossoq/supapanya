import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import parser from 'html-react-parser'
import fetchJson from '../../utils/fetchJson'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons'
import type { PostResponse } from '../../types/Blog'

const BlogView = ({ postName }: { postName: string }): JSX.Element => {
  const [postMeta, setPostMeta] = useState<PostResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchJson('/api/getpost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postName }),
    }).then((response: PostResponse) => {setPostMeta(response); setIsLoading(false)})
  }, [postName])
  const elementGenerator = (postContent: string) => {
    let returnBuffer: { tag?: string; content?: string }[] = []
    const splitContents: string[] =
      postContent.match(/[^\r\n]+/g)?.map((item: string) => item.trim()) || []
    const element = splitContents.map((splitContent, idx) => {
      const tag = splitContent.match(/\[.*?\]/g)
      const content: string = splitContent.replace(/\[.*?\]/g, '')
      if (tag) {
        switch (tag[0]) {
          case '[BLOCKQUOTE LARGE]':
            return (
              <p key={idx} className="is-italic p-5-c-desktop p-1-c">
                {parser(content)}
              </p>
            )
          case '[H2 BOLD]':
            return (
              <h2
                key={idx}
                className="is-size-3 my-4 has-text-weight-bold"
              >
                {parser(content)}
              </h2>
            )
          case '[OL]':
            returnBuffer = []
            break
          case '[/OL]':
            const buffer = returnBuffer
            returnBuffer = []
            return (
              <ol key={idx} className="px-5 my-4">
                {buffer.map(({ tag, content }, idx) => {
                  switch (tag) {
                    case 'li':
                      return (
                        <li
                          key={`list-${idx}`}
                          className="has-text-weight-bold my-4"
                        >
                          {parser(content || '')}
                        </li>
                      )
                    case 'text':
                      return <p key={`listp-${idx}`}>{parser(content || '')}</p>
                  }
                })}
              </ol>
            )
          case '[LI]':
            returnBuffer.push({ tag: 'li', content })
            break
          case '[TEXT]':
            if (returnBuffer.length === 0) {
              return (
                <p key={idx} className="px-5 py-3">
                  {parser(content)}
                </p>
              )
            } else {
              returnBuffer.push({ tag: 'text', content })
              break
            }
          case '[IMAGE]':
            const src = content.match(/(?:src=")(.*?)(?=")/g)?.toString().replace('src="', '')
            const alt = content.match(/(?:alt=")(.*?)(?=")/g)?.toString().replace('alt="', '')
            return (
              <figure
                key={idx}
                className="my-2"
                style={{ position: 'relative', height: '40vw' }}
              >
                <Image
                  src={src || ''}
                  alt={alt || ''}
                  layout={'fill'}
                  objectFit={'contain'}
                />
              </figure>
            )
          default:
            break
        }
      }
    })
    return element
  }
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
          <span className="is-size-1 has-text-weight-bold">Now Loading...</span>
          <progress className="progress is-medium is-primary" max="100">45%</progress>
        </section>
      </div>
    </>
    )
  } else {
    if (postMeta && postMeta.complete && postMeta.postStatus === 'publish') {
      return (
        <>
          <Head>
            <title>{postMeta.postTitle} - สถาบันศุภปัญญาไอ.เค.</title>
            <meta property="og:title" content={`${postMeta.postTitle} - สถาบันศุภปัญญาไอ.เค.`} />
          </Head>
          <div className="is-flex is-flex-direction-column p-5-c-desktop p-1-c mb-6">
            <section className="px-6-c-desktop pb-4-c-desktop px-1-c pb-2-c has-text-grey has-text-right">
              <span className="icon-text">
                <span>Published by</span>
                <span className="icon">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span>Supapanya</span>
                <span className="ml-2-c-desktop ml-1-c">on</span>
                <span className="icon">
                  <FontAwesomeIcon icon={faClock} />
                </span>
                <span>{postMeta.postDate && dateGenerator(postMeta.postDate)}</span>
              </span>
            </section>
            <header className="has-text-centered">
              <h1 className="is-size-1 has-text-weight-bold">
                {postMeta.postTitle}
              </h1>
            </header>
            <section className="is-size-5 p-5-c-desktop p-1-c">
              {postMeta.postContent && elementGenerator(postMeta.postContent)}
              <p key="lastSection" className="is-size-6 is-italic p-5">
                เป็นอย่างไรกันบ้างคะ ข้อแนะนำดีๆเกี่ยวกับรูปแบบการเรียน
                ผู้ปกครองหรือน้องๆคนไหนที่เห็นข้อดีแบบนี้แล้วสนใจที่จะเรียนพิเศษกับทางสถาบันศุภปัญญาไอ.เค.
                สามารถติดต่อมาได้ที่ 062 225 6359 (ครูก้อย) หรือ Inbox
                เข้ามาที่เพจได้เลยค่ะ สถาบันศุภปัญญาไอ.เค.
                สถาบันที่มีประสบการณ์มากกว่า 20 ปี ดีที่สุดในย่านหนองแขม
              </p>
            </section>
          </div>
        </>
      )
    } else {
      return (
        <>
          <Head>
            <title>ไม่พบบทความ - สถาบันศุภปัญญาไอ.เค.</title>
            <meta property="og:title" content="บทความที่น่าสนใจ - สถาบันศุภปัญญาไอ.เค." />
          </Head>
          <div className="is-flex is-flex-direction-column p-5-c-desktop p-1-c">
            <header className="has-text-centered">
              <h1 className="is-size-1 has-text-weight-bold">PostNotFound</h1>
            </header>
            <section className="p-5-c-desktop p-1-c">Post not found. It may be removed.</section>
          </div>
        </>
      )
    }
  }
}

export default BlogView
