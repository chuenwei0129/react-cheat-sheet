import { use } from 'react'
import { findTodos } from './actions'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

export default function Page() {
  const todos = use(findTodos())
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Todo List</h1>

      <TodoForm />

      <ul className="mt-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <p>
        {todos.length} {todos.length === 1 ? 'todo' : 'todos'} found
      </p>
      <p>{todos.filter((todo) => todo.completed).length} completed</p>
      <p>{todos.filter((todo) => !todo.completed).length} not completed</p>
    </div>
  )
}
