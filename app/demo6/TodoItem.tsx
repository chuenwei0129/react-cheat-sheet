'use client'

import { useState } from 'react'
import { deleteTodo, editTodo, Todo, toggleTodo } from './actions'

export default function TodoItem({ todo }: { todo: Todo }) {
  const [completed, setCompleted] = useState(todo.completed)

  return (
    <li key={todo.id} className="flex items-center gap-2">
      <input
        id={String(todo.id)}
        type="checkbox"
        defaultChecked={todo.completed}
        onChange={async (e) => {
          await toggleTodo(todo.id)
          setCompleted(e.target.checked)
        }}
      />
      <label
        htmlFor={String(todo.id)}
        className={completed ? 'text-black/40 line-through' : 'text-black'}
      >
        {todo.title}
        <button
          type="button"
          className="ml-2 rounded bg-red-500 px-2 py-1 text-white"
          onClick={async () => {
            await deleteTodo(todo.id)
          }}
        >
          Delete
        </button>
        <button
          type="button"
          className="ml-2 rounded bg-blue-500 px-2 py-1 text-white"
          onClick={async () => {
            const newTitle = prompt('Edit todo title', todo.title)
            if (newTitle) {
              if (newTitle === todo.title) {
                alert('Title is the same')
                return
              }
              await editTodo(todo.id, newTitle)
            }
          }}
        >
          Edit
        </button>
      </label>
    </li>
  )
}
