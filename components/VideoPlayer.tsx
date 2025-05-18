'use client'

import { useCallback, useEffect, useRef } from 'react'
import { match, P } from 'ts-pattern'
import { useImmerReducer } from 'use-immer'

// 组件属性类型定义
interface VideoPlayerProps {
  src: string
  containerWidth: number
  containerHeight: number
  title?: string
  description?: string
  className?: string
}

// 视频播放器内部状态类型
interface VideoState {
  videoWidth: number // 视频原始宽度
  videoHeight: number // 视频原始高度
  containerWidth: number // 容器宽度
  containerHeight: number // 容器高度
  isPlaying: boolean // 是否正在播放
  currentTime: number // 当前播放时间
  duration: number // 视频总时长
  volume: number // 音量
  isMuted: boolean // 是否静音
}

// reducer 支持的所有 action 类型
type VideoAction =
  | { type: 'SET_VIDEO_DIMENSIONS'; payload: { width: number; height: number } }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'TOGGLE_MUTE' }

// reducer 初始状态
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

// Immer reducer，结合 ts-pattern 进行分支匹配
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

// 视频样式类型
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
  // 使用 useImmerReducer 管理视频状态
  const [state, dispatch] = useImmerReducer(videoReducer, {
    ...initialState,
    containerWidth,
    containerHeight,
  })

  // 计算视频在容器中的样式，核心适配逻辑
  const calculateVideoStyle = useCallback((): VideoStyle => {
    const videoRatio = state.videoHeight / state.videoWidth // 视频高宽比
    const containerRatio = state.containerHeight / state.containerWidth // 容器高宽比

    // 竖屏容器适配逻辑
    return match({ videoRatio, containerRatio })
      .with({ containerRatio: P.when((r) => r >= 1.77) }, () => {
        if (videoRatio > containerRatio) {
          // 视频比容器更高，按容器宽度缩放，垂直居中，上下裁切
          return {
            width: '100%',
            height: 'auto',
            objectFit: 'cover' as const,
            objectPosition: 'center',
          }
        } else if (videoRatio >= 1.77) {
          // 视频比容器稍矮但仍是竖屏，按容器高度缩放，水平居中，左右裁切
          return {
            width: 'auto',
            height: '100%',
            objectFit: 'cover' as const,
            objectPosition: 'center',
          }
        } else {
          // 视频为横屏或方形，按容器宽度缩放，垂直居中，上下留黑边
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

  // 监听视频元数据加载，获取视频原始尺寸
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

  // 根据播放状态自动播放/暂停
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (state.isPlaying) {
      video.play()
    } else {
      video.pause()
    }
  }, [state.isPlaying])

  // 音量和静音状态同步到 video 元素
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
      {/* 视频元素，点击可切换播放/暂停 */}
      <video
        ref={videoRef}
        src={src}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={calculateVideoStyle()}
        onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
      />

      {/* 可选：底部渐变遮罩，显示标题和描述 */}
      {/* {(title || description) && (
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {description && <p className="text-sm">{description}</p>}
        </div>
      )} */}
    </div>
  )
}
