export default function Page() {
  return (
    // 默认 overflow: visible 不建立 BFC
    // 2 个元素在同一个 BFC 中即垂直 margin 合并。
    <div className="mt-[50px] h-[200px] w-[200px] bg-amber-200">
      <div className="float-left mt-[100px] bg-amber-800">hello world</div>
    </div>
  )
}
