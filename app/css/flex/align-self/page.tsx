'use client'

export default function Page() {
  return (
    <div className="flex max-w-2xl gap-4 rounded-2xl bg-gray-100 p-4">
      <div className="flex aspect-[4/3] min-w-[200px] basis-[240px] items-center justify-center rounded-2xl bg-blue-300">
        <svg
          className="object-contain text-amber-300 mix-blend-difference"
          viewBox="0 0 1445 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
        >
          <path
            d="M0.005421 131.312941V584.282353a30.117647 30.117647 0 0 0 49.995294 22.889412l271.661177-236.724706a60.235294 60.235294 0 0 1 77.101176 0l259.011765 207.209412 142.757647-142.757647a60.235294 60.235294 0 0 1 80.112941-4.216471l301.176471 240.941176a60.235294 60.235294 0 1 1-75.294118 93.967059l-259.011765-207.209412-142.757647 142.757648a60.235294 60.235294 0 0 1-80.112941 4.21647L361.417186 493.929412l-301.176471 262.625882a180.705882 180.705882 0 0 0-60.235294 136.131765A131.312941 131.312941 0 0 0 131.318362 1024h1183.021177A131.312941 131.312941 0 0 0 1445.65248 892.687059V131.312941A131.312941 131.312941 0 0 0 1314.339539 0H131.318362A131.312941 131.312941 0 0 0 0.005421 131.312941zM1114.358362 421.647059a144.564706 144.564706 0 1 1 144.564706-144.564706A144.564706 144.564706 0 0 1 1114.358362 421.647059z"
            fill="currentColor"
            p-id="5504"
          ></path>
        </svg>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        <h3 className="overflow-hidden font-bold text-ellipsis whitespace-nowrap">
          <small className="block text-sm font-bold">UX Design</small>
          Make it easier to search and filter Make it easier to search and
          filter
        </h3>

        {/* 默认 stretch，所以加了 self-end 按钮就收缩了*/}
        <button
          type="button"
          className="self-end rounded-full bg-blue-500 px-4 py-2 text-white"
        >
          Read More
        </button>
      </div>
    </div>
  )
}
