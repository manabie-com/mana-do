import React, { useState, useRef, useEffect } from 'react'
import useOnClickOutside from '../../hooks/useClickOutside'

import produce from 'immer';
import {isTodoCompleted} from '../../utils';

import type {TodoItemProps} from './type'
import type {Todo} from '../../models/todo';

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

  // Handle dbclick to edit a todo
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

  // Handle click to remove a todo
  const handleRemoveTodo = (todoId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you want to delete this?')) {
      onDelete(event, todoId)
    }
  }

  if (editMode) {
    return (
      <form className="Todo_form_edit" data-testid="todo-form-edit" onSubmit={handleEditTodoContent}>
        <input
          autoFocus
          required
          className="Todo_input_edit" 
          value={todo.content} 
          onChange={handleChangeTodoContent}
          ref={inputRef}
          data-testid="todo-input-edit"
        />
      </form>
    )
  }

  return (
    <div className="ToDo__item" data-testid="todo-item">
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onChangeStatus(e, todo.id)}
      />
      <span onDoubleClick={handleChangeEditMode}>{todo.content}</span>
      <button
        className="Todo__delete"
        onClick={handleRemoveTodo(todo.id)}
      >
        X
      </button>
    </div>
  )
}

export * from './type'
export {TodoItem}