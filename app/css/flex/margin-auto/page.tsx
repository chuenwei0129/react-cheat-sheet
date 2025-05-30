'use client'

export default function Page() {
  return (
    <div>
      <header className="flex items-center gap-6 bg-white px-6 py-4 shadow-sm">
        <a className="block hover:cursor-pointer hover:opacity-80">
          <svg
            className="h-6 w-6 text-gray-800"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
          >
            <path
              d="M98.048 357.568a31.872 31.872 0 0 0-13.632 30.528v247.808a31.872 31.872 0 0 0 13.632 30.528l395.904 270.72a32 32 0 0 0 36.096 0l395.84-270.72a31.808 31.808 0 0 0 13.824-29.696V387.328a31.808 31.808 0 0 0-13.824-29.76l-395.84-270.72a32 32 0 0 0-36.096 0l-395.904 270.72zM155.776 384l328.96-225.024v190.08L294.848 479.04 155.776 384z m383.36-34.944v-190.08L868.224 384l-138.944 95.04-190.08-129.92zM246.656 512L138.816 585.728V438.272L246.592 512z m638.72-73.792v147.584L777.408 512l107.904-73.792z m-156.096 106.752L868.16 640l-328.96 225.024v-190.08l190.016-129.984z m-244.48 129.92v190.08L155.84 640l139.008-95.04 190.016 129.92zM681.088 512L512 627.648 342.976 512l168.96-115.648L681.088 512z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
        <nav>
          <ul className="flex items-center gap-8">
            <li>
              <a href="" className="text-gray-600 hover:text-gray-900">
                Shop
              </a>
            </li>
            <li>
              <a href="" className="text-gray-600 hover:text-gray-900">
                Popular pie
              </a>
            </li>
            <li>
              <a href="" className="text-gray-600 hover:text-gray-900">
                Events
              </a>
            </li>
            <li>
              <a href="" className="text-gray-600 hover:text-gray-900">
                Recipes
              </a>
            </li>
            <li>
              <a href="" className="text-gray-600 hover:text-gray-900">
                Contact us
              </a>
            </li>
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <span className="flex items-center gap-2">
            <svg
              className="h-5 w-5 rounded-full bg-gray-100 p-1 text-gray-600"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
            >
              <path
                d="M410.156231 702.707207h212.242673c16.639103 0 30.116023-13.48194 30.116023-30.116023s-13.47692-30.116023-30.116023-30.116023H410.156231c-16.634083 0-30.116023 13.48194-30.116023 30.116023s13.48194 30.116023 30.116023 30.116023z"
                fill="currentColor"
              ></path>
              <path
                d="M999.597075 85.840705a20.042213 20.042213 0 0 0-28.258869-2.765655l-57.692262 47.397601C888.348485 54.781046 816.923317 0 732.824322 0c-80.339511 0-149.099411 49.992598-177.157506 120.464093H468.270117C440.22206 49.992598 371.46216 0 291.122649 0 207.028674 0 135.603506 54.781046 110.301027 130.472651L52.608765 83.07505a20.052252 20.052252 0 0 0-28.258868 2.760635 20.06731 20.06731 0 0 0 2.770674 28.258869L96.683565 171.239708c1.405414 1.154448 2.991525 1.862174 4.557558 2.579939a192.873051 192.873051 0 0 0-0.853287 16.910147c0 105.170172 85.564641 190.734813 190.734813 190.734813s190.734813-85.564641 190.734813-190.734813c0-10.274583-1.039003-20.278122-2.615074-30.116023h65.467215c-1.571053 9.837901-2.620094 19.84144-2.620094 30.116023 0 105.170172 85.564641 190.734813 190.734813 190.734813s190.734813-85.564641 190.734813-190.734813c0-5.706986-0.361392-11.333663-0.863326-16.915166 1.581091-0.712746 3.167202-1.415453 4.567597-2.57492l69.568014-57.155193a20.06731 20.06731 0 0 0 2.760635-28.24883z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="text-gray-600">Current user: chu</span>
          </span>
        </div>
      </header>
    </div>
  )
}
