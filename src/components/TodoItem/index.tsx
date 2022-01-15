import React, { useState, useRef } from 'react'
import useOnClickOutside from '../../hooks/useClickOutside'

import produce from 'immer';
import {isTodoCompleted} from '../../utils';

import type {TodoItemProps} from './type'

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { data, onChangeStatus, onDelete, onEdit } = props

  const [editMode, setEditMode] = useState(false)
  const [todo, setTodo] = useState(data)

  const inputRef = useRef<HTMLInputElement>(null)

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

  return (
    <div className="ToDo__item">
        <input
            type="checkbox"
            checked={isTodoCompleted(todo)}
            onChange={(e) => onChangeStatus(e, todo.id)}
        />
        {editMode && (
          <form className="Todo_form_edit" onSubmit={handleEditTodoContent}>
            <input
              autoFocus
              className="Todo__input__edit" 
              value={todo.content} 
              onChange={handleChangeTodoContent}
              ref={inputRef}
            />
          </form>
        )}
        {!editMode && <span onDoubleClick={handleChangeEditMode}>{todo.content}</span>}
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