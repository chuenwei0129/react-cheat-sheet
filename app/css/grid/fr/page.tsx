'use client'
import Image from 'next/image'

export default function Page() {
  const services = [
    {
      id: 1,
      title: '研究与策略设计',
      description: '我们提供全方位服务，确保您的设计和内容需求得到完美满足。',
      image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606',
    },
    {
      id: 2,
      title: '品牌与设计',
      description:
        '我们提供全方位服务，为您的品牌注入独特魅力我们提供全方位服务，为您的品牌注入独特魅力我们提供全方位服务，为您的品牌注入独特魅力我们提供全方位服务，为您的品牌注入独特魅力我们提供全方位服务，为您的品牌注入独特魅力。',
      image: 'https://images.unsplash.com/photo-1462651567147-aa679fd1cfaf',
    },
    {
      id: 3,
      title: '创意制作',
      description: '我们提供全方位服务，让您的创意完美呈现。',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* 标题部分 */}
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-xl font-semibold text-pink-600">
            我们的服务
          </h2>
          <h1 className="text-4xl font-bold text-gray-700 md:text-5xl">
            全球顶尖服务
          </h1>
        </div>

        {/* 服务卡片网格 */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* 图片容器 */}
              <div className="relative h-64 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
              </div>

              {/* 内容部分 */}
              <div className="relative z-10 mx-4 -mt-16">
                <div className="rounded-xl bg-white p-6 shadow-lg">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{service.description}</p>
                  <a
                    href="#"
                    className="inline-flex items-center text-pink-600 hover:text-pink-700"
                  >
                    了解更多
                    <svg
                      className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
