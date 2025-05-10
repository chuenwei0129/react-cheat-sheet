'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useReducer } from 'react'
import { Loader2 } from 'lucide-react'
import { match, P } from 'ts-pattern'

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: { id: number; email: string } }
  | { status: 'error'; message: string }

type Action =
  | { type: 'SUBMIT' }
  | { type: 'RESOLVE'; data: { id: number; email: string } }
  | { type: 'REJECT'; error: Error }
  | { type: 'VALIDATION_ERROR'; message: string } // 新增校验错误类型

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const mockApiRequest = (email: string) => {
  return new Promise<{ id: number; email: string }>((resolve, reject) => {
    setTimeout(() => {
      Math.random() < 0.5
        ? resolve({ id: Math.random() * 1000, email })
        : reject(new Error('Failed to subscribe. Please try again.'))
    }, 1000)
  })
}

function reducer(state: State, action: Action) {
  return (
    match<[State, Action]>([state, action])
      .returnType<State>()
      // 新增校验错误处理
      .with([P._, { type: 'VALIDATION_ERROR' }], ([, action]) => ({
        status: 'error',
        message: action.message,
      }))
      .with([{ status: P.not('loading') }, { type: 'SUBMIT' }], () => ({
        status: 'loading',
      }))
      .with([{ status: 'loading' }, { type: 'RESOLVE' }], ([, action]) => ({
        status: 'success',
        data: action.data,
      }))
      .with([{ status: 'loading' }, { type: 'REJECT' }], ([, action]) => ({
        status: 'error',
        message: action.error.message,
      }))
      .otherwise(() => state)
  )
}

export default function Page() {
  const [state, dispatch] = useReducer(reducer, { status: 'idle' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget // 保存表单引用
    const formData = new FormData(form)
    const email = formData.get('email')?.toString()?.trim() || ''

    // 新增校验逻辑
    if (!email) {
      dispatch({ type: 'VALIDATION_ERROR', message: 'Email is required.' })
      return
    }

    if (!isValidEmail(email)) {
      dispatch({
        type: 'VALIDATION_ERROR',
        message: 'Please enter a valid email address.',
      })
      return
    }

    try {
      dispatch({ type: 'SUBMIT' })
      const data = await mockApiRequest(email)
      dispatch({ type: 'RESOLVE', data })
    } catch (error) {
      dispatch({
        type: 'REJECT',
        error: error instanceof Error ? error : new Error('Unknown error'),
      })
    }
    form.reset() // 提交成功后清空表单
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 max-w-sm"
      noValidate // 禁用浏览器默认验证
    >
      <div className="flex space-x-2">
        <Input
          type="email"
          placeholder="Enter your email"
          name="email"
          disabled={state.status === 'loading'}
        />
        <Button
          type="submit"
          disabled={state.status === 'loading'}
          className="min-w-[120px]"
        >
          {match(state)
            .with({ status: 'loading' }, () => (
              <Loader2 className="animate-spin h-5 w-5" />
            ))
            .otherwise(() => 'Subscribe')}
        </Button>
      </div>

      <div className="min-h-[40px]">
        {match(state)
          .with({ status: 'error' }, ({ message }) => (
            <p className="text-red-500 text-sm animate-fade-in">❌ {message}</p>
          ))
          .with({ status: 'success' }, ({ data }) => (
            <div className="text-green-600 text-sm animate-fade-in">
              ✅ Subscribed successfully!
              <div className="mt-1 text-xs text-gray-500">
                Subscription ID: {Math.floor(data.id)}
              </div>
            </div>
          ))
          .with({ status: 'idle' }, () => (
            <div className="text-gray-500">No data yet</div>
          ))
          .otherwise(() => null)}
      </div>
    </form>
  )
}
