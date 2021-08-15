import React, { useRef, useEffect } from 'react'
import videojs from 'video.js'
import VideoHTML from './videoHTML'
import type { VideoOptions } from '../../../types/VideoJS'
import 'video.js/dist/video-js.min.css'

require('@silvermine/videojs-quality-selector')(videojs)
require('@silvermine/videojs-quality-selector/dist/css/quality-selector.css')

const VideoJS = ({ options }: { options: VideoOptions }): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      if (!playerRef.current) {
        playerRef.current = videojs(videoElement, options)
      } else {
        playerRef.current.src(options.sources)
        playerRef.current.poster(options.poster)
      }
    }
  }, [options])

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [])

  return <VideoHTML ref={videoRef} />
}

export const resolutions = ['360p', '480p', '720p', '1080p']
export default VideoJS
