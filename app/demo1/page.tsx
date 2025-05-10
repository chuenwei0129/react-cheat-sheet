'use client'

import { useState, startTransition } from 'react'
import { match } from 'ts-pattern'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [tab, setTab] = useState('Tab 1')

  return (
    <div>
      {(['Tab 1', 'Tab 2', 'Tab 3'] as const).map((tabName) => (
        <Button
          key={tabName}
          onClick={() =>
            match(tabName)
              .with('Tab 2', () => {
                // 使用 startTransition 来延迟更新状态
                startTransition(() => {
                  setTab(tabName)
                })
              })
              .otherwise(() => {
                // 直接更新状态
                setTab(tabName)
              })
          }
        >
          {match(tab)
            .with(tabName, () => 'Selected')
            .otherwise(() => 'Not Selected')}{' '}
          - {tabName}
        </Button>
      ))}

      {match(tab)
        .with('Tab 1', () => <div>Content for Tab 1</div>)
        .with('Tab 2', () => <HeavyComponent />)
        .with('Tab 3', () => <div>Content for Tab 3</div>)
        .otherwise(() => null)}
    </div>
  )
}

// 通过生成大量元素模拟耗时渲染
const HeavyComponent = () => {
  // 创建包含 50000 个元素的数组
  const items = Array.from({ length: 50000 }, (_, i) => (
    <div key={i}>Item {i + 1}</div>
  ))

  return (
    <div>
      <div>Heavy Content (50,000 items):</div>
      <div>{items}</div>
    </div>
  )
}
