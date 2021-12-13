import React, { useRef } from 'react'
import './TodoInput.css'

interface Props {
  onCreateTodo: (todo: string) => Promise<void>
}

const TodoInput = ({ onCreateTodo }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //Ignore enter key when there is no value
    if (e.key === 'Enter' && inputRef.current && inputRef.current.value !== '') {
      onCreateTodo(inputRef.current.value)
      inputRef.current.value = '';
    }
  }

  return (
    <div className="ToDoInput__container">
      <input
        ref={inputRef}
        data-testid="todo-input"
        className="ToDoInput__input"
        placeholder="What needs to be done?"
        onKeyDown={handleCreateTodo}
      />
    </div>
  )
}

export default TodoInput