'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

const setRef = (node: HTMLButtonElement | null) => {
  const handler = () => {
    alert('点击了按钮')
  }
  node?.addEventListener('click', handler)
  return () => {
    node?.removeEventListener('click', handler)
  }
}

export default function Page() {
  const [showButton, setShowButton] = useState(false)

  return (
    <div>
      <Button
        onClick={() => {
          setShowButton((prev) => !prev)
        }}
      >
        {showButton ? '隐藏按钮' : '显示按钮'}
      </Button>
      <br />
      {showButton && <Button ref={setRef}>点击我</Button>}
    </div>
  )
}
