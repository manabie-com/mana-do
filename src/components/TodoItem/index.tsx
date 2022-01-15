import React, { useState, useRef, useEffect } from 'react'
import useOnClickOutside from '../../hooks/useClickOutside'

import produce from 'immer';
import {isTodoCompleted} from '../../utils';

import type {TodoItemProps} from './type'
import type { Todo } from '../../models/todo';

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { data, onChangeStatus, onDelete, onEdit } = props

  const [editMode, setEditMode] = useState(false)
  const [todo, setTodo] = useState({} as Todo)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTodo(data)
  }, [data])

  // Handle click outside to discard all changes
  useOnClickOutside(inputRef, () => {
    setTodo((prev) => produce(prev, (draft) => {
      draft.content = data.content
    }))
    setEditMode(false)
  })

  // Handle doublick to edit a todo
  const handleChangeEditMode = () => {
    setEditMode(true)
  }

  // Handle change content of todo
  const handleChangeTodoContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setTodo((prev) => produce(prev, (draft) => {
      draft.content = value
    }))
  }

  // Submit all changes after pressing "Enter"
  const handleEditTodoContent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onEdit(todo)
    setEditMode(false)
  }

  if (editMode) {
    return (
      <form className="Todo_form_edit" onSubmit={handleEditTodoContent}>
        <input
          autoFocus
          required
          className="Todo_input_edit" 
          value={todo.content} 
          onChange={handleChangeTodoContent}
          ref={inputRef}
        />
      </form>
    )
  }

  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onChangeStatus(e, todo.id)}
      />
      <span onDoubleClick={handleChangeEditMode}>{todo.content}</span>
      <button
        className="Todo__delete"
        onClick={(e) => onDelete(e, todo.id)}
      >
        X
      </button>
    </div>
  )
}

export * from './type'
export {TodoItem}