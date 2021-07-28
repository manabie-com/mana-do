/**
 * This sub-item help:
 * - Remove binding on render function.
 * - Break the UI into a component hierarchy.
 * - Identify the minimal (but complete) representation of UI state.
 */
import React, { useCallback } from 'react'
import { isTodoCompleted } from 'root/utils'
import { Todo } from 'root/models/todo';

export type TodoItemProps = {
  todo: Todo,
  deleteTodo: Function,
  onUpdateTodoStatus: Function,
  deleteItemText: string
}

const TodoItem = (props: TodoItemProps) => {
  const { todo, deleteTodo, onUpdateTodoStatus, deleteItemText } = props

  const handleUpdateTodoStatus = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateTodoStatus(e, todo.id)
  }, [onUpdateTodoStatus, todo.id])

  const handleDeleteTodo = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    deleteTodo(todo.id)
  }, [deleteTodo, todo.id])

  return (
    <div className='ToDo__item'>
      <input
        type='checkbox'
        checked={isTodoCompleted(todo)}
        onChange={handleUpdateTodoStatus}
      />
      <span>{todo.content}</span>
      <button
        className='Todo__delete'
        onClick={handleDeleteTodo}
      >
        {deleteItemText}
      </button>
    </div>
  )
}

//use shallowly compare complex objects in the props object
export default React.memo(TodoItem)