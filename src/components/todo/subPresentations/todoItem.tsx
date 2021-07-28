/**
 * This sub-item help:
 * - Remove binding on render function.
 * - Break the UI into a component hierarchy.
 * - Identify the minimal (but complete) representation of UI state.
 */
import React, { useCallback, useState } from 'react'
import { isTodoCompleted } from 'root/utils'
import { Todo } from 'root/models/todo';

export type TodoItemProps = {
  todo: Todo,
  deleteTodo: Function,
  onUpdateTodoStatus: Function,
  onUpdateTodoContent: Function,
  deleteItemText: string
}

const text = {
  save: 'Save',
  edit: 'Edit'
}

const TodoItem = (props: TodoItemProps) => {
  const { todo, deleteTodo, onUpdateTodoStatus
    , deleteItemText, onUpdateTodoContent
  } = props

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

  return (
    <div className='ToDo__item'
      onDoubleClick={handleDoubleClickItem}
    >
      <input
        type='checkbox'
        checked={isTodoCompleted(todo)}
        onChange={handleUpdateTodoStatus}
      />
      {
        isEditMode ? <input
        style={{
          width: '80%'
        }}
          onBlur={handleUpdateTodoContent}
          defaultValue={todo.content}
        />
        : <span>{todo.content}</span>
      }
      <button
        className='Todo__delete'
        onClick={handleDeleteTodo}
      >
        {deleteItemText}
      </button>
    </div>
  )
}

export default TodoItem