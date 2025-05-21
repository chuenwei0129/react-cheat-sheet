import Image from 'next/image'

export default function Page() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-shrink flex-grow basis-[300px] flex-col rounded-2xl bg-blue-200 p-10">
        <figure>
          <Image
            src="https://picsum.photos/200"
            width={200}
            height={200}
            alt="缩略图"
          />
        </figure>
        <h3>Card Title</h3>
        <p className="flex-grow">
          Card Describe Card Describe Card Describe Card Describe Card Describe
          Card Describe Card Describe Card Describe Card Describe Card Describe
        </p>
        <button
          className="self-end rounded-lg bg-blue-500 p-2 text-white"
          type="button"
        >
          Button
        </button>
      </div>
      <div className="flex flex-shrink flex-grow basis-[300px] flex-col rounded-2xl bg-blue-200 p-10">
        <figure>
          <Image
            src="https://picsum.photos/200"
            width={200}
            height={200}
            alt="缩略图"
          />
        </figure>
        <h3>Card Title</h3>
        <p className="flex-grow">Card Describe</p>
        <button
          className="self-end rounded-lg bg-blue-500 p-2 text-white"
          type="button"
        >
          Button
        </button>
      </div>
      <div className="flex flex-shrink flex-grow basis-[300px] flex-col rounded-2xl bg-blue-200 p-10">
        <figure>
          <Image
            src="https://picsum.photos/200"
            width={200}
            height={200}
            alt="缩略图"
          />
        </figure>
        <h3>Card Title</h3>
        <p className="flex-grow">Card Describe</p>
        <button
          className="self-end rounded-lg bg-blue-500 p-2 text-white"
          type="button"
        >
          Button
        </button>
      </div>
    </div>
  )
}
