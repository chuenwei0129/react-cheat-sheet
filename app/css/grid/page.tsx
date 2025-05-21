export default function Page() {
  return (
    <div>
      <div className="grid h-screen grid-cols-[220px_1fr_220px] grid-rows-[auto_1fr_auto]">
        <div className="col-[1/4] row-start-1 row-end-2 bg-blue-300">
          Header
        </div>
        <div className="col-[2/3] row-[2/3] bg-green-300">Main</div>
        <div className="col-[1/2] row-[2/3] bg-red-300">Nav</div>
        <div className="col-[3/4] row-[2/3] bg-yellow-300">Aside</div>
        <div className="col-[1/4] row-[3/4] bg-purple-300">Footer</div>
      </div>
    </div>
  )
}
