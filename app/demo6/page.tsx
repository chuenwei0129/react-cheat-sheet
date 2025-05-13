import { use } from 'react'
import { findTodos } from './actions'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'

export default function Page() {
  const todos = use(findTodos())
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

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
