'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const [showButton, setShowButton] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const current = ref.current
    const handler = () => {
      alert('点击了按钮')
    }
    current?.addEventListener('click', handler)
    return () => {
      current?.removeEventListener('click', handler)
    }
  }, [showButton])

  return (
    <div>
      <h1>Demo 8</h1>
      <Link href={'/demo8/ref'}>回调 ref 支持清理函数</Link>
      <br />
      <Button
        onClick={() => {
          setShowButton((prev) => !prev)
        }}
      >
        {showButton ? '隐藏按钮' : '显示按钮'}
      </Button>
      <br />
      {showButton && <Button ref={ref}>点击我</Button>}
    </div>
  )
}
