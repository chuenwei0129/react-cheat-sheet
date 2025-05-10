'use client'

import { useState, useDeferredValue } from 'react' // 1. 替换 startTransition 为 useDeferredValue
import { match } from 'ts-pattern'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [tab, setTab] = useState('Tab 1')
  const deferredTab = useDeferredValue(tab) // 2. 创建延迟值

  return (
    <div>
      {(['Tab 1', 'Tab 2', 'Tab 3'] as const).map((tabName) => (
        <Button
          key={tabName}
          // 3. 移除 startTransition，所有点击直接更新状态
          onClick={() => setTab(tabName)}
        >
          {match(tab) // 保持使用即时状态判断选中
            .with(tabName, () => 'Selected')
            .otherwise(() => 'Not Selected')}{' '}
          - {tabName}
        </Button>
      ))}

      {/* 4. 使用延迟值渲染内容区域 */}
      {match(deferredTab)
        .with('Tab 1', () => <div>Content for Tab 1</div>)
        .with('Tab 2', () => <HeavyComponent />)
        .with('Tab 3', () => <div>Content for Tab 3</div>)
        .otherwise(() => null)}
    </div>
  )
}

const HeavyComponent = () => {
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
