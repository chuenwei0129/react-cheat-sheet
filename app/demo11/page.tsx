'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// 自定义 Hook 实现类似指令功能
function useResizeDirective(callback: (entry: ResizeObserverEntry) => void) {
  const ref = useRef<HTMLDivElement>(null)

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        callback(entry)
      }
    },
    [callback],
  )

  useEffect(() => {
    const element = ref.current
    if (!element || typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(handleResize)
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [handleResize])

  return ref
}

export default function Page() {
  // 定义尺寸变化回调
  const handleResize = (entry: ResizeObserverEntry) => {
    console.log('元素尺寸变化:', entry.contentRect)
  }

  // 使用自定义 Hook 获取 ref
  const resizeRef = useResizeDirective(handleResize)

  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className="flex justify-center text-red-500">Demo 11</h1>
      {/* 绑定 ref 到目标元素 */}
      <div
        ref={resizeRef}
        style={{ width: '100%', height: '200px', border: '1px solid red' }}
      >
        ul*li 调整浏览器窗口大小观察控制台输出
      </div>
    </div>
  )
}
