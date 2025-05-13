import { use } from 'react'
import { findTodos } from './actions'
import AddButton from './AddButton'

export default function Page() {
  const todos = use(findTodos())

  return (
    <div>
      <h1>Todo List</h1>
      <p>Click the button to add a new todo.</p>
      <AddButton todos={todos} />
    </div>
  )
}
