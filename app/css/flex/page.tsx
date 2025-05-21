const Page = () => {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-gray-100 p-4">
      {/* 伪元素装饰条 */}
      <div className="flex before:h-6 before:w-1 before:bg-blue-500 before:content-['']">
        <span>📢</span>
      </div>
      {/* 文本节点自动成为 Flex 项目 */}
      系统消息：
      {/* 常规子元素 */}
      <span className="flex items-center gap-1">
        <span className="text-blue-500">新版本已发布</span>
        <span>→</span>
      </span>
      {/* 带 after 伪元素的按钮 */}
      <button className="flex items-center after:ml-1 after:block after:h-2 after:w-2 after:rounded-full after:bg-green-500 after:content-['']">
        查看详情
      </button>
    </div>
  )
}

export default Page
