'use server'

import { revalidateTag } from 'next/cache'
import { State } from './AddButton'

export interface Todo {
  id: number
  title: string
  completed: boolean
  sending?: boolean
}

const todos: Todo[] = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: true },
]

export const findTodos = async () => todos

export const addTodo = async (_: State, formData: FormData): Promise<State> => {
  const title = formData.get('title')?.toString()?.trim() || ''

  if (!title) {
    return {
      status: 'error',
      error: 'Title is required',
    }
  }

  const newTodo: Todo = {
    id: todos.length + 1,
    title,
    completed: false,
  }

  try {
    if (Math.random() < 0.5) {
      throw new Error('Simulated error: Failed to add todo')
    }

    todos.push(newTodo)

    return { status: 'success' }
  } catch (error) {
    return { status: 'error', error: (error as Error).message }
  } finally {
    revalidateTag('/todos')
  }
}
