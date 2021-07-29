/**
 * This sub-item help:
 * - Remove binding on render function.
 * - Break the UI into a component hierarchy.
 * - Identify the minimal (but complete) representation of UI state.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { isTodoCompleted } from 'root/utils'
import { Todo } from 'root/models/todo';

export type TodoItemProps = {
  todo: Todo,
  deleteTodo: Function,
  onUpdateTodoStatus: Function,
  onUpdateTodoContent: Function,
  deleteItemText: string
}

const TodoItem = (props: TodoItemProps) => {
  const { todo, deleteTodo, onUpdateTodoStatus
    , deleteItemText, onUpdateTodoContent
  } = props

  const inputRef  = useRef<HTMLInputElement>(document.createElement('input'))

  const [isEditMode, setIsEditMode] = useState(false)

  const handleUpdateTodoStatus = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTodoStatus(e, todo.id)
  }, [onUpdateTodoStatus, todo.id])

  const handleDoubleClickItem = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsEditMode(true)
  }, [setIsEditMode])

  const handleUpdateTodoContent = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditMode(false)
    onUpdateTodoContent(todo.id, e.target.value)
  }, [onUpdateTodoContent, todo.id, setIsEditMode])

  const handleDeleteTodo = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    deleteTodo(todo.id)
  }, [deleteTodo, todo.id])

  useEffect(() => {
    isEditMode && inputRef !== null && inputRef.current.focus()
  }, [isEditMode])

  return (
    <div className='ToDo__item'
      data-testid={'todo-item'}
      id={`todo-item-${todo.id}`}
      onDoubleClick={handleDoubleClickItem}
    >
      <input
        data-testid={'checkbox-status'}
        type='checkbox'
        ref={inputRef}
        checked={isTodoCompleted(todo)}
        onChange={handleUpdateTodoStatus}
      />
      {
        isEditMode ? <input
          data-testid={'input-edit-todo'}
          className='TodoItem__input'
          onBlur={handleUpdateTodoContent}
          defaultValue={todo.content}
        />
        : <span>{todo.content}</span>
      }
      <button
        data-testid={'btn-delete-todo'}
        className='Todo__delete'
        onClick={handleDeleteTodo}
      >
        {deleteItemText}
      </button>
    </div>
  )
}

export default TodoItem