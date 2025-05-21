'use client'

import { useState } from 'react'

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

const directionDescriptions: Record<FlexDirection, string> = {
  row: '默认值，主轴为水平方向，起点在左端',
  'row-reverse': '主轴为水平方向，起点在右端',
  column: '主轴为垂直方向，起点在上沿',
  'column-reverse': '主轴为垂直方向，起点在下沿',
}

export default function Page() {
  const [direction, setDirection] = useState<FlexDirection>('row')

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">Flex 布局方向演示</h1>
        <div className="mb-4">
          <label htmlFor="flex-direction" className="mr-2 font-medium">
            flex-direction:
          </label>
          <select
            name="flex-direction"
            id="flex-direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value as FlexDirection)}
            className="rounded border border-gray-300 px-3 py-1"
          >
            <option value="row">row</option>
            <option value="row-reverse">row-reverse</option>
            <option value="column">column</option>
            <option value="column-reverse">column-reverse</option>
          </select>
        </div>
        <p className="text-gray-600">{directionDescriptions[direction]}</p>
      </div>

      <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div
          className="flex min-h-[200px] items-center justify-center gap-4 rounded-lg bg-white p-4 shadow-sm"
          style={{ flexDirection: direction }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-blue-500 text-white shadow-md">
            1
          </div>
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-green-500 text-white shadow-md">
            2
          </div>
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-purple-500 text-white shadow-md">
            3
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <h2 className="mb-2 font-semibold">代码示例：</h2>
        <pre className="rounded bg-gray-800 p-4 text-white">
          <code>
            {`<div style={{ flexDirection: '${direction}' }}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>`}
          </code>
        </pre>
      </div>
    </div>
  )
}
