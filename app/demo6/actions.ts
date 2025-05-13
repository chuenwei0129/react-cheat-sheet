'use server'

import { revalidateTag } from 'next/cache'
import { State } from './TodoForm'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

const todos: Todo[] = []

export const findTodos = async () => {
  return todos
}

export const addTodo = async (_: State, formData: FormData): Promise<State> => {
  const title = formData.get('title')?.toString()?.trim() || ''
  if (!title) {
    return { status: 'error', error: 'Title is required' }
  }

  const newTodo: Todo = {
    id: todos.length + 1,
    title,
    completed: false,
  }

  todos.push(newTodo)

  revalidateTag('todos')

  return { status: 'success' }
}

export const toggleTodo = async (id: number) => {
  const todo = todos.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error('Todo not found')
  }
  todo.completed = !todo.completed
  revalidateTag('todos')
  return todo
}

export const deleteTodo = async (id: number) => {
  const index = todos.findIndex((todo) => todo.id === id)
  if (index === -1) {
    throw new Error('Todo not found')
  }
  todos.splice(index, 1)
  revalidateTag('todos')
}

export const editTodo = async (id: number, title: string) => {
  const todo = todos.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error('Todo not found')
  }
  todo.title = title
  revalidateTag('todos')
  return todo
}
