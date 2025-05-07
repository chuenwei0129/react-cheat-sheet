'use client'

import { type FC, type PropsWithChildren, useState } from 'react'

const Template: FC<PropsWithChildren> = ({ children }) => {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>Template {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {children}
    </>
  )
}

export default Template
