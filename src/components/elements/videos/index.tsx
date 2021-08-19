/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import VideoJS, { resolutions } from './videoJS'
import Image from 'next/image'
import useUser from '../../../utils/useUser'
import type { VideoOptions, VideoList } from '../../../types/VideoJS'

const videoJSOptionsDefault: VideoOptions = {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true,
  controlBar: {
    children: [
      'playToggle',
      'progressControl',
      'volumePanel',
      'qualitySelector',
      'fullscreenToggle',
    ],
  },
}

const VideoJSElement = ({
  videoList,
}: {
  videoList: VideoList[]
}): JSX.Element => {
  const [videoJSOptions, setVideoJSOptions] = useState<VideoOptions>(
    videoJSOptionsDefault
  )
  const [idDef, setidDef] = useState<number>(1)
  const [userId, setUserId] = useState<number>(0)

  const { user } = useUser()

  useEffect(() => {
    if (user) {
      if (user.isLoggedIn) {
        const { isLoggedIn, ...data } = user
        setUserId(data.id)
      }
    }
  }, [user])

  const generateMeta = (id: number, name: string, baseUrl: string) => {
    let sources: any[] = []
    const match = baseUrl.match('([^/]+$)')
    let baseFile: string
    if (match) {
      baseFile = match[0]
    } else {
      baseFile = ''
    }
    for (let i = 0; i < 4; i++) {
      let source = {
        src: `${baseUrl}/${baseFile}_${resolutions[i]}.mp4`,
        type: 'video/mp4',
        label: `${resolutions[i]}`,
      }
      if (i === 3) {
        source = { ...source, ...{ selected: true } }
      }
      sources.push(source)
    }
    const poster = `${baseUrl}/cover.jpg`
    const meta = {
      id,
      name,
      sources,
      poster,
    }
    return meta
  }

  const videoSourceLists: { [k: string]: any } = videoList.map(
    ({ id, name, baseUrl }: VideoList) => {
      const meta = generateMeta(id, name, baseUrl)
      return meta
    }
  )

  useEffect(() => {
    if (videoSourceLists.length > 0) {
      setVideoJSOptions({ ...videoJSOptionsDefault, ...videoSourceLists[0] })
    }
  }, [userId])

  const handleSourceChange = (id: number) => {
    const prepOptions = {
      ...videoJSOptionsDefault,
      ...videoSourceLists[id - 1],
    }
    if (idDef !== id) {
      setidDef(id)
      setVideoJSOptions(prepOptions)
    }
  }

  return (
    <div className="is-flex is-flex-direction-column">
      <div className="is-flex is-justify-content-center mb-5">
        <VideoJS options={videoJSOptions} />
      </div>
      <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center">
        {videoSourceLists.length > 1 && Object.values(videoSourceLists).map(({ id, poster, name }) => {
          return (
            <a key={id} href="#" onClick={() => handleSourceChange(id)}>
              <div
                key={id}
                className="ml-2 mr-2 is-flex is-flex-direction-column"
              >
                <Image key={id} src={poster} alt={name} width={180} height={101} />
                <span className="has-text-centered has-text-dark">{name}</span>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default VideoJSElement
