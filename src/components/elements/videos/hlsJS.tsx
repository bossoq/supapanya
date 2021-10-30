import { useRef } from 'react'
import ReactPlayer from 'react-player'

const HLSVideo = ({ src }: { src: string }): JSX.Element => {
  const playerRef = useRef<HTMLVideoElement>(null)

  return (
    <>
      <ReactPlayer
        playerRef={playerRef}
        url={src}
        autoPlay
        controls
        pip
        width="100%"
        height="auto"
      />
    </>
  )
}

export default HLSVideo
