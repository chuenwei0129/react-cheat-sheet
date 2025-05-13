'use client'

import { useActionState, useEffect, useOptimistic } from 'react'
import { addTodo, Todo } from './actions'

export interface State {
  status: 'idle' | 'error' | 'success'
  error?: string
}

export default function AddButton({ todos }: { todos: Todo[] }) {
  const [state, formAction, pending] = useActionState(addTodo, {
    status: 'idle',
  })
  const [oOptimisticTodos, optimisticAddTodo] = useOptimistic<Todo[], string>(
    todos,
    (currentTodos, optimisticTitle) => {
      return [
        ...currentTodos,
        {
          id: currentTodos.length + 1,
          title: optimisticTitle,
          completed: false,
          sending: true,
        },
      ]
    }
  )

  useEffect(() => {
    function handler(e: BeforeUnloadEvent) {
      if (!pending) return
      e.preventDefault()
      // do
    }

    window.addEventListener('beforeunload', handler)

    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [pending])

  return (
    <div>
      <form
        action={async (formData: FormData) => {
          const title = formData.get('title')?.toString()?.trim() || ''
          optimisticAddTodo(title)
          formAction(formData)
        }}
      >
        <input type="text" name="title" placeholder="New Todo" />
        <button type="submit">{pending ? 'Adding...' : 'Add Todo'}</button>
      </form>
      {state.status === 'error' && (
        <p style={{ color: 'red' }}>{state.error}</p>
      )}
      {state.status === 'success' && (
        <p style={{ color: 'green' }}>Todo added successfully!</p>
      )}
      {state.status === 'idle' && <p>Ready to add a new todo.</p>}
      <ul>
        {oOptimisticTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Completed' : 'Not Completed'}
            {todo.sending && <span> (Sending...)</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
