'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

// 模拟随机成功/失败的请求
const mockApiRequest = (email: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random()
      if (random < 0.5) {
        // 50% 概率成功
        resolve({
          id: Math.floor(Math.random() * 1000),
          email,
          status: 'subscribed',
        })
      } else {
        // 50% 概率失败
        reject(new Error('Failed to subscribe. Please try again.'))
      }
    }, 1000) // 添加1秒延迟模拟网络请求
  })
}

export default function Page() {
  const [data, setData] = useState<{ id: number; email: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    if (!email.trim()) {
      setError('Please enter an email')
      return
    }

    setLoading(true)
    setError('')
    setData(null)

    try {
      const response = await mockApiRequest(email)
      setData(response as { id: number; email: string })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-sm ">
      <div className="flex space-x-2">
        <Input
          type="email"
          placeholder="Enter your email"
          name="email"
          required
          disabled={loading}
        />
        <Button type="submit" disabled={loading} className="min-w-[120px]">
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Subscribe'}
        </Button>
      </div>

      {/* 状态反馈区域 */}
      <div className="min-h-[40px]">
        {error && (
          <p className="text-red-500 text-sm animate-fade-in">❌ {error}</p>
        )}

        {data && (
          <div className="text-green-600 text-sm animate-fade-in">
            ✅ Subscribed successfully!
            <div className="mt-1 text-xs text-gray-500">
              Subscription ID: {data.id}
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
