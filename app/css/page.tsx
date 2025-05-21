import Link from 'next/link'

export default function CSSNavigationPage() {
  const cssCategories = [
    {
      title: '布局',
      items: [
        { name: 'Flex 弹性布局', path: '/flex' },
        { name: 'Grid 网格布局', path: '/css/grid' },
        { name: '定位', path: '/css/position' },
      ],
    },
    {
      title: '样式',
      items: [
        { name: '颜色与背景', path: '/css/colors' },
        { name: '文本排版', path: '/css/typography' },
        { name: '阴影与效果', path: '/css/effects' },
      ],
    },
    {
      title: '动画',
      items: [
        { name: '过渡效果', path: '/css/transitions' },
        { name: '关键帧动画', path: '/css/animations' },
        { name: '变形', path: '/css/transforms' },
      ],
    },
    {
      title: '响应式',
      items: [
        { name: '媒体查询', path: '/css/media-queries' },
        { name: '移动优先', path: '/css/mobile-first' },
        { name: '容器查询', path: '/css/container-queries' },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 顶部导航区域 */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="mb-4 text-3xl font-bold">CSS 特性导航站</h1>
          <p className="mb-6">探索现代CSS的各种特性和使用技巧</p>

          {/* 导航菜单 */}
          <nav className="flex flex-wrap gap-1 md:gap-2">
            {cssCategories.map((category) => (
              <div key={category.title} className="group relative">
                <button className="rounded-md bg-white/20 px-4 py-2 transition-colors hover:bg-white/30">
                  {category.title}
                </button>
                <div className="invisible absolute left-0 z-10 mt-1 w-48 rounded-md bg-white shadow-lg transition-all group-hover:visible">
                  <div className="rounded-md bg-white py-1 shadow-xs">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        // @ts-expect-error 简化路径类型处理，路径字符串在Next.js中实际可用
                        href={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* 主要展示区域 */}
      <main className="container mx-auto flex-grow p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cssCategories.map((category) => (
            <div
              key={category.title}
              className="overflow-hidden rounded-xl bg-white shadow-md"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                <h2 className="text-xl font-bold text-white">
                  {category.title}
                </h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        // @ts-expect-error 简化路径类型处理，路径字符串在Next.js中实际可用
                        href={item.path}
                        className="block rounded p-2 transition-colors hover:bg-gray-100"
                      >
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-xl bg-white shadow-md">
          <div className="border-b p-6">
            <h2 className="text-2xl font-bold text-gray-800">CSS 特性预览</h2>
            <p className="mt-2 text-gray-600">
              点击上方导航或卡片链接，探索不同的CSS特性和示例
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
            {/* 特色CSS示例 */}
            <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-pink-400 to-red-500 shadow-lg transition-shadow hover:shadow-xl">
              <span className="text-xl font-bold text-white">渐变背景</span>
            </div>

            <div className="flex aspect-video items-center justify-center rounded-lg bg-blue-500 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="animate-float text-xl font-bold text-white">
                悬浮动画
              </span>
            </div>

            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-yellow-100 shadow-lg">
              <div className="animate-gradient-x absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500"></div>
              <span className="relative z-10 text-xl font-bold text-white">
                渐变动画
              </span>
            </div>

            <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white">
              <span className="text-xl font-medium text-gray-500">
                边框样式
              </span>
            </div>

            <div className="shadow-neon flex aspect-video items-center justify-center rounded-lg bg-white">
              <span className="animate-pulse-slow text-xl font-medium text-blue-500">
                霓虹效果
              </span>
            </div>

            <div className="group relative flex aspect-video items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              <div className="absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity group-hover:opacity-50"></div>
              <span className="z-10 text-xl font-bold text-white">
                悬停蒙版
              </span>
            </div>

            <div className="shadow-3d flex aspect-video items-center justify-center rounded-lg bg-white">
              <span className="text-xl font-medium text-gray-700">3D 阴影</span>
            </div>

            <div className="flex aspect-video transform items-center justify-center rounded-lg bg-gradient-to-br from-yellow-200 to-yellow-400 p-6 shadow-lg transition-transform duration-300 hover:scale-105">
              <span className="text-xl font-bold text-yellow-900">
                缩放效果
              </span>
            </div>

            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg">
              <div className="absolute inset-0 -skew-y-6 transform bg-blue-500"></div>
              <span className="relative z-10 text-xl font-bold text-white">
                变形效果
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 py-6 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>
            CSS 导航站 &copy; {new Date().getFullYear()} - 探索现代CSS的无限可能
          </p>
        </div>
      </footer>
    </div>
  )
}
