'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useActionState } from 'react'
import { match } from 'ts-pattern'

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

type State =
  | { status: 'idle' }
  | { status: 'success'; data: { id: number; email: string } }
  | { status: 'error'; error: string }

export default function Page() {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_, formData) => {
      const email = formData.get('email')?.toString()?.trim() || ''

      if (!isValidEmail(email)) {
        return { status: 'error', error: 'Invalid email address' }
      }

      try {
        const data = await mockApiRequest(email)
        return { status: 'success', data }
      } catch (error) {
        return { status: 'error', error: (error as Error).message }
      }
    },
    { status: 'idle' }
  )

  return (
    <form
      action={formAction}
      className="flex flex-col space-y-4 max-w-sm"
      noValidate
    >
      <div className="flex space-x-2">
        <Input type="email" placeholder="Enter your email" name="email" />
        <Button type="submit" className="min-w-[120px]" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : 'Subscribe'}
        </Button>
      </div>

      <div className="min-h-[40px]">
        {match(state)
          .with({ status: 'error' }, ({ error }) => (
            <p className="text-red-500 text-sm animate-fade-in">❌ {error}</p>
          ))
          .with({ status: 'success' }, ({ data }) => (
            <div className="text-green-500">
              ✅ Subscribed successfully!
              <div className="mt-1 text-xs text-gray-500">
                Subscription ID: {Math.floor(data.id)}
              </div>
            </div>
          ))
          .with({ status: 'idle' }, () => (
            <div className="text-gray-500">No data yet</div>
          ))
          .exhaustive()}
      </div>
    </form>
  )
}
