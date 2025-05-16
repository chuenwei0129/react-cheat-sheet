'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState('')

  return (
    <section>
      <nav className="flex items-center justify-center gap-10 text-blue-600">
        <Link href="/demo9/about">About</Link>
        <Link href="/demo9/settings">Settings</Link>
      </nav>
      <label
        htmlFor="text"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        在这里随意输入一些内容：
      </label>
      <div className="mt-2">
        <input
          id="text"
          required
          className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {children}
    </section>
  )
}
