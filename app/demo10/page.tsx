'use client'

import { useState } from 'react'
import VideoPlayer from '../../components/VideoPlayer'

const VERTICAL_CONTAINER = { width: 225, height: 400 }
const HORIZONTAL_CONTAINER = { width: 400, height: 225 }

// 文件名宽:高，ratioLabel宽:高，高宽比=高/宽
const videoTestCases = [
  {
    id: '2-1',
    ratioLabel: '宽:高 = 2:1',
    hwLabel: '高/宽 = 1/2',
    name: '视频高/宽 = 0.5 < 1.77',
    description: '按容器宽度等比缩放，垂直居中，上下留黑边。',
    detail: '视频为横屏或方形，缩放后宽度填满容器，高度不足时留黑边。',
    src: '/videos/output_2-1.mp4',
  },
  {
    id: '1-2',
    ratioLabel: '宽:高 = 1:2',
    hwLabel: '高/宽 = 2/1',
    name: '视频高/宽 = 2 > 容器高/宽',
    description: '按容器宽度等比缩放，垂直居中，上下裁切。',
    detail: '视频比容器更高，缩放后宽度填满容器，高度超出部分裁切。',
    src: '/videos/output_1-2.mp4',
  },
  {
    id: '16-9',
    ratioLabel: '宽:高 = 16:9',
    hwLabel: '高/宽 = 9/16',
    name: '视频高/宽 = 0.5625 < 1.77',
    description: '按容器宽度等比缩放，垂直居中，上下留黑边。',
    detail: '视频为横屏或方形，缩放后宽度填满容器，高度不足时留黑边。',
    src: '/videos/output_16-9.mp4',
  },
  {
    id: '9-16',
    ratioLabel: '宽:高 = 9:16',
    hwLabel: '高/宽 = 16/9',
    name: '1.77 ≤ 视频高/宽 = 1.78 ≈ 容器高/宽',
    description: '按容器高度等比缩放，水平居中，左右裁切。',
    detail: '视频比容器稍矮但仍是竖屏，缩放后高度填满容器，宽度超出部分裁切。',
    src: '/videos/output_9-16.mp4',
  },
  {
    id: '1-1',
    ratioLabel: '宽:高 = 1:1',
    hwLabel: '高/宽 = 1/1',
    name: '视频高/宽 = 1 < 1.77',
    description: '按容器宽度等比缩放，垂直居中，上下留黑边。',
    detail: '视频为横屏或方形，缩放后宽度填满容器，高度不足时留黑边。',
    src: '/videos/output_1-1.mp4',
  },
  {
    id: '3-4',
    ratioLabel: '宽:高 = 3:4',
    hwLabel: '高/宽 = 4/3',
    name: '视频高/宽 = 1.33 < 1.77',
    description: '按容器宽度等比缩放，垂直居中，上下留黑边。',
    detail: '视频为横屏或方形，缩放后宽度填满容器，高度不足时留黑边。',
    src: '/videos/output_3-4.mp4',
  },
  {
    id: '4-3',
    ratioLabel: '宽:高 = 4:3',
    hwLabel: '高/宽 = 3/4',
    name: '视频高/宽 = 0.75 < 1.77',
    description: '按容器宽度等比缩放，垂直居中，上下留黑边。',
    detail: '视频为横屏或方形，缩放后宽度填满容器，高度不足时留黑边。',
    src: '/videos/output_4-3.mp4',
  },
]

const verticalAdaptLogic = [
  {
    condition: '视频高/宽 > 容器高/宽',
    operation: '按容器宽度等比缩放，垂直居中，上下裁切。',
    logic: '视频比容器更高，缩放后宽度填满容器，高度超出部分裁切。',
  },
  {
    condition: '1.77 ≤ 视频高/宽 ≤ 容器高/宽',
    operation: '按容器高度等比缩放，水平居中，左右裁切。',
    logic: '视频比容器稍矮但仍是竖屏，缩放后高度填满容器，宽度超出部分裁切。',
  },
  {
    condition: '视频高/宽 < 1.77',
    operation: '按容器宽度等比缩放，垂直居中，上下留黑边。',
    logic: '视频为横屏或方形，缩放后宽度填满容器，高度不足时留黑边。',
  },
]

const horizontalAdaptLogic = [
  {
    condition: '所有视频比例',
    operation: '按容器宽度等比缩放，垂直居中，上下裁切或留黑边。',
    logic:
      '无论视频比例如何，始终以容器宽度为基准缩放。\n- 若缩放后视频高度 > 容器高度：上下裁切。\n- 若缩放后视频高度 ≤ 容器高度：上下留黑边。',
  },
]

export default function Page() {
  const [isVertical, setIsVertical] = useState(true)
  const [activeCaseId, setActiveCaseId] = useState<string>(videoTestCases[0].id)
  const currentCase = videoTestCases.find((tc) => tc.id === activeCaseId)

  // 根据模式切换容器宽高
  const container = isVertical ? VERTICAL_CONTAINER : HORIZONTAL_CONTAINER
  const containerLabel = isVertical
    ? '竖屏容器 450×800 (高/宽≈1.78)'
    : '横屏容器 800×450 (高/宽≈0.56)'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-100 p-8">
      <div className="mx-auto w-full max-w-full overflow-x-auto">
        <h1 className="mb-4 text-3xl font-bold text-blue-900">
          视频容器适配测试
        </h1>
        {/* 容器切换按钮组 */}
        <div className="mb-8 flex gap-4">
          <button
            className={`rounded-lg border-2 px-5 py-2 text-base font-bold shadow-sm transition-colors ${
              isVertical
                ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                : 'border-blue-400 bg-white text-blue-700 hover:bg-blue-50'
            }`}
            onClick={() => setIsVertical(true)}
          >
            竖屏容器
          </button>
          <button
            className={`rounded-lg border-2 px-5 py-2 text-base font-bold shadow-sm transition-colors ${
              !isVertical
                ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                : 'border-blue-400 bg-white text-blue-700 hover:bg-blue-50'
            }`}
            onClick={() => setIsVertical(false)}
          >
            横屏容器
          </button>
          <span className="ml-4 flex items-center font-mono text-sm text-gray-600">
            {containerLabel}
          </span>
        </div>
        {/* Tab 导航 */}
        <div className="mb-8 flex space-x-2 overflow-x-auto">
          {videoTestCases.map((tc) => (
            <button
              key={tc.id}
              onClick={() => setActiveCaseId(tc.id)}
              className={`rounded-lg border-2 px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${
                activeCaseId === tc.id
                  ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                  : 'border-blue-400 bg-white text-blue-700 hover:bg-blue-50'
              }`}
            >
              {tc.ratioLabel}
            </button>
          ))}
        </div>
        {/* 当前测试用例信息 */}
        {currentCase && (
          <div className="mb-8 rounded-lg border-2 border-blue-400 bg-white p-6 shadow-lg">
            <h2 className="mb-2 flex items-center gap-4 text-xl font-bold">
              <span className="inline-block rounded border-2 border-blue-600 bg-blue-50 px-2 py-1 font-mono text-base text-blue-700">
                {currentCase.ratioLabel}
              </span>
              <span className="inline-block font-mono text-base text-gray-500">
                {currentCase.hwLabel}
              </span>
              {currentCase.name}
            </h2>
            <div className="mb-2 text-gray-600">
              <span className="font-semibold">操作：</span>
              {isVertical
                ? currentCase.description
                : horizontalAdaptLogic[0].operation}
            </div>
            <div className="mb-4 text-gray-600">
              <span className="font-semibold">逻辑：</span>
              {isVertical ? (
                currentCase.detail
              ) : (
                <span className="whitespace-pre-line">
                  {horizontalAdaptLogic[0].logic}
                </span>
              )}
            </div>
            <div className="flex justify-center">
              <div
                className="rounded-xl border-4 border-blue-600 bg-gray-50 shadow-xl"
                style={{ width: container.width, height: container.height }}
              >
                <VideoPlayer
                  src={currentCase.src}
                  containerWidth={container.width}
                  containerHeight={container.height}
                  title={currentCase.name}
                  description={
                    isVertical
                      ? currentCase.description
                      : horizontalAdaptLogic[0].operation
                  }
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        )}
        {/* 适配逻辑说明区 */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
          <div className="mb-2 font-bold">
            {isVertical ? '竖屏容器适配逻辑' : '横屏/方形容器适配逻辑'}：
          </div>
          {isVertical ? (
            <ul className="list-disc space-y-1 pl-5">
              {verticalAdaptLogic.map((item, idx) => (
                <li key={idx}>
                  <b>{item.condition}</b>：{item.operation}
                  <br />
                  <span className="ml-2 text-gray-700">{item.logic}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="list-disc space-y-1 pl-5">
              {horizontalAdaptLogic.map((item, idx) => (
                <li key={idx}>
                  <b>{item.condition}</b>：{item.operation}
                  <br />
                  <span className="ml-2 whitespace-pre-line text-gray-700">
                    {item.logic}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
