'use client'

import { useCallback, useEffect, useRef } from 'react'
import { match, P } from 'ts-pattern'
import { useImmerReducer } from 'use-immer'

interface VideoPlayerProps {
  src: string
  containerWidth: number
  containerHeight: number
  title?: string
  description?: string
  className?: string
}

interface VideoState {
  videoWidth: number
  videoHeight: number
  containerWidth: number
  containerHeight: number
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
}

type VideoAction =
  | { type: 'SET_VIDEO_DIMENSIONS'; payload: { width: number; height: number } }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'TOGGLE_MUTE' }

const initialState: VideoState = {
  videoWidth: 0,
  videoHeight: 0,
  containerWidth: 0,
  containerHeight: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
}

function videoReducer(draft: VideoState, action: VideoAction) {
  match(action)
    .with({ type: 'SET_VIDEO_DIMENSIONS' }, ({ payload }) => {
      draft.videoWidth = payload.width
      draft.videoHeight = payload.height
    })
    .with({ type: 'TOGGLE_PLAY' }, () => {
      draft.isPlaying = !draft.isPlaying
    })
    .with({ type: 'SET_CURRENT_TIME' }, ({ payload }) => {
      draft.currentTime = payload
    })
    .with({ type: 'SET_DURATION' }, ({ payload }) => {
      draft.duration = payload
    })
    .with({ type: 'SET_VOLUME' }, ({ payload }) => {
      draft.volume = payload
    })
    .with({ type: 'TOGGLE_MUTE' }, () => {
      draft.isMuted = !draft.isMuted
    })
    .exhaustive()
}

interface VideoStyle {
  width: string
  height: string
  objectFit: 'cover' | 'contain'
  objectPosition: string
}

export default function VideoPlayer({
  src,
  containerWidth,
  containerHeight,
  title,
  description,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [state, dispatch] = useImmerReducer(videoReducer, {
    ...initialState,
    containerWidth,
    containerHeight,
  })

  const calculateVideoStyle = useCallback((): VideoStyle => {
    const videoRatio = state.videoHeight / state.videoWidth
    const containerRatio = state.containerHeight / state.containerWidth

    return match({ videoRatio, containerRatio })
      .with({ containerRatio: P.when((r) => r >= 1.77) }, () => {
        if (videoRatio > containerRatio) {
          // 按容器宽度缩放，垂直居中，上下裁切
          return {
            width: '100%',
            height: 'auto',
            objectFit: 'cover' as const,
            objectPosition: 'center',
          }
        } else if (videoRatio >= 1.77) {
          // 按容器高度缩放，水平居中，左右裁切
          return {
            width: 'auto',
            height: '100%',
            objectFit: 'cover' as const,
            objectPosition: 'center',
          }
        } else {
          // 按容器宽度缩放，垂直居中，上下留黑边
          return {
            width: '100%',
            height: 'auto',
            objectFit: 'contain' as const,
            objectPosition: 'center',
          }
        }
      })
      .otherwise(() => ({
        // 横屏或方形容器：按容器宽度缩放，垂直居中
        width: '100%',
        height: 'auto',
        objectFit: 'contain' as const,
        objectPosition: 'center',
      }))
  }, [
    state.videoWidth,
    state.videoHeight,
    state.containerWidth,
    state.containerHeight,
  ])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      dispatch({
        type: 'SET_VIDEO_DIMENSIONS',
        payload: {
          width: video.videoWidth,
          height: video.videoHeight,
        },
      })
      dispatch({ type: 'SET_DURATION', payload: video.duration })
    }

    const handleTimeUpdate = () => {
      dispatch({ type: 'SET_CURRENT_TIME', payload: video.currentTime })
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [dispatch])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (state.isPlaying) {
      video.play()
    } else {
      video.pause()
    }
  }, [state.isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.volume = state.volume
    video.muted = state.isMuted
  }, [state.volume, state.isMuted])

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={calculateVideoStyle()}
        onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
      />

      {(title || description) && (
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {description && <p className="text-sm">{description}</p>}
        </div>
      )}
    </div>
  )
}
