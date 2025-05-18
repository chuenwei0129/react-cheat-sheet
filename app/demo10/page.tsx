'use client'

import { useState } from 'react'
import VideoPlayer from '../components/VideoPlayer'

const CONTAINER_WIDTH = 450
const CONTAINER_HEIGHT = 800

const testCases = [
  {
    id: '16-9',
    name: '16:9 裁切',
    description: '上下裁切，宽拉左右',
    src: '/videos/output_16-9.mp4',
    containerWidth: CONTAINER_WIDTH,
    containerHeight: CONTAINER_HEIGHT,
  },
  {
    id: '2-1',
    name: '2:1 裁切',
    description: '左右裁切，宽拉上下',
    src: '/videos/output_2-1.mp4',
    containerWidth: CONTAINER_WIDTH,
    containerHeight: CONTAINER_HEIGHT,
  },
  {
    id: '1-1',
    name: '1:1 填充',
    description: '左右留黑',
    src: '/videos/output_1-1.mp4',
    containerWidth: CONTAINER_WIDTH,
    containerHeight: CONTAINER_HEIGHT,
  },
  {
    id: '3-4',
    name: '3:4',
    description: '上下留黑',
    src: '/videos/output_3-4.mp4',
    containerWidth: CONTAINER_WIDTH,
    containerHeight: CONTAINER_HEIGHT,
  },
  {
    id: '4-3',
    name: '4:3',
    description: '上下留黑',
    src: '/videos/output_4-3.mp4',
    containerWidth: CONTAINER_WIDTH,
    containerHeight: CONTAINER_HEIGHT,
  },
]

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>(testCases[0].id)
  const currentTestCase = testCases.find((tc) => tc.id === activeTab)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">视频容器适配测试</h1>
        {/* Tab 导航 */}
        <div className="mb-8 flex space-x-2 overflow-x-auto">
          {testCases.map((tc) => (
            <button
              key={tc.id}
              onClick={() => setActiveTab(tc.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tc.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tc.name}
            </button>
          ))}
        </div>
        {/* 当前测试用例信息 */}
        {currentTestCase && (
          <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-bold">{currentTestCase.name}</h2>
            <p className="mb-4 text-gray-600">{currentTestCase.description}</p>
            <div className="flex justify-center">
              <VideoPlayer
                src={currentTestCase.src}
                containerWidth={currentTestCase.containerWidth}
                containerHeight={currentTestCase.containerHeight}
                title={currentTestCase.name}
                description={currentTestCase.description}
                className="mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
