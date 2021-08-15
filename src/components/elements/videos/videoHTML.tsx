import React, { forwardRef, ForwardedRef } from 'react'

const VideoHTML = forwardRef(
  (props: any, videoRef: ForwardedRef<HTMLVideoElement>) => (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  )
)

export default VideoHTML
