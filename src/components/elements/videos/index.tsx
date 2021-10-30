/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import VideoJS, { resolutions } from './videoJS'
import HLSVideo from './hlsJS'
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
  const [videoSourceHLS, setVideoSourceHLS] = useState<string>('')
  const [fileType, setFileType] = useState<string>('')
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

  const generateMeta = (
    id: number,
    name: string,
    baseUrl: string,
    fileType: string
  ) => {
    if (fileType === 'MP4') {
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
        fileType,
      }
      return meta
    } else {
      const source = `${baseUrl}/index.m3u8`
      const poster = `${baseUrl}/cover.jpg`
      const meta = {
        id,
        name,
        source,
        poster,
        fileType,
      }
      return meta
    }
  }

  const videoSourceLists: Record<string, any> = videoList.map(
    ({ id, name, baseUrl, fileType }: VideoList) => {
      return generateMeta(id, name, baseUrl, fileType)
    }
  )

  useEffect(() => {
    if (videoSourceLists.length > 0) {
      if (videoSourceLists[0].fileType === 'MP4') {
        setVideoJSOptions({ ...videoJSOptionsDefault, ...videoSourceLists[0] })
        setFileType('MP4')
      } else {
        setVideoSourceHLS(videoSourceLists[0].sources)
        setFileType('HLS')
      }
    }
  }, [userId])

  const handleSourceChange = (id: number) => {
    const videoSource: Record<string, any> = Object.values(
      videoSourceLists
    ).filter((i) => i.id === id)[0]
    console.log(videoSource)
    if (idDef !== id) {
      if (videoSource.fileType === 'MP4') {
        const prepOptions = {
          ...videoJSOptionsDefault,
          ...videoSource,
        }
        setVideoJSOptions(prepOptions)
        setFileType('MP4')
      } else {
        setVideoSourceHLS(videoSource.source)
        setFileType('HLS')
      }
      setidDef(id)
    }
  }

  return (
    <div className="is-flex is-flex-direction-column">
      <div className="is-flex is-justify-content-center mb-5">
        {fileType === 'MP4' ? (
          <VideoJS options={videoJSOptions} />
        ) : (
          <HLSVideo src={videoSourceHLS} />
        )}
      </div>
      <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center">
        {videoSourceLists.length > 1 &&
          Object.values(videoSourceLists).map(({ id, poster, name }) => {
            return (
              <a key={id} href="#" onClick={() => handleSourceChange(id)}>
                <div
                  key={id}
                  className="ml-2 mr-2 is-flex is-flex-direction-column"
                >
                  <Image
                    key={id}
                    src={poster}
                    alt={name}
                    width={180}
                    height={101}
                  />
                  <span className="has-text-centered has-text-dark">
                    {name}
                  </span>
                </div>
              </a>
            )
          })}
      </div>
    </div>
  )
}

export default VideoJSElement
