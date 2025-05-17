'use client'

import { useActionState } from 'react'
import { match } from 'ts-pattern'
import { addTodo } from './actions'

export type State =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; error: string }

export default function TodoForm() {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    addTodo,
    {
      status: 'idle',
    },
  )

  return (
    <div>
      <form action={formAction} className="flex items-center gap-2">
        <input
          type="text"
          name="title"
          placeholder="Add a new todo"
          className="rounded border border-gray-300 px-2 py-1"
        />
        <button
          type="submit"
          className="ml-2 rounded bg-blue-500 px-4 py-1 text-white"
        >
          {isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
      <div>
        {match(state)
          .with({ status: 'error' }, ({ error }) => (
            <p className="animate-fade-in text-sm text-red-500">❌ {error}</p>
          ))
          .otherwise(() => null)}
      </div>
    </div>
  )
}
