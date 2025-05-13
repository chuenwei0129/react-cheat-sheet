'use client'

import { useActionState } from 'react'
import { addTodo } from './actions'
import { match } from 'ts-pattern'

export type State =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; error: string }

export default function TodoForm() {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    addTodo,
    {
      status: 'idle',
    }
  )

  return (
    <div>
      <form action={formAction} className="flex items-center gap-2">
        <input
          type="text"
          name="title"
          placeholder="Add a new todo"
          className="border border-gray-300 rounded px-2 py-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-1 ml-2"
        >
          {isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
      <div>
        {match(state)
          .with({ status: 'error' }, ({ error }) => (
            <p className="text-red-500 text-sm animate-fade-in">❌ {error}</p>
          ))
          .otherwise(() => null)}
      </div>
    </div>
  )
}
