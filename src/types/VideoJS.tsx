import { VideoJsPlayerOptions } from 'video.js'

export interface VideoOptions extends VideoJsPlayerOptions {
  idx?: number
  name?: string
  sources?: {
    src: string
    type: string
    label?: string
    selected?: boolean
  }[]
}

export interface VideoList {
  [x: string]: any
  idx: number
  name: string
  baseUrl: string
  type: string
  allowAll: boolean
  allowList?: number[]
  fileType: string
}

export const videoJSOptionsDefault: VideoOptions = {
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
