import Image from 'next/image'

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        className="rounded-full"
        src="https://picsum.photos/200"
        width={100}
        height={100}
        alt="我们要水平垂直居中"
      />
      <h3>大漠|chuenwei.com</h3>
      <p>掘金小册.现代Web布局</p>
    </div>
  )
}
