/**
 * This sub-item help:
 * - Remove binding on render function.
 * - Break the UI into a component hierarchy.
 * - Identify the minimal (but complete) representation of UI state.
 */
import React, { useCallback, useRef, useState } from 'react'
import { isTodoCompleted } from 'root/utils'
import { Todo } from 'root/models/todo'
import WithTooltip from 'root/components/commons/tooltip'

export type TodoItemProps = {
  todo: Todo,
  deleteTodo: Function,
  onUpdateTodoStatus: Function,
  onUpdateTodoContent: Function,
  deleteItemText: string,
  text?: any
}

const defaultText = {
  enterTodoName: 'Enter todo name...'
}

const TodoItem = (props: TodoItemProps) => {
  const { todo, deleteTodo, onUpdateTodoStatus
    , deleteItemText, onUpdateTodoContent, text = defaultText
  } = props

  const inputRef = useRef<HTMLInputElement>(document.createElement('input'))

  const [isEditMode, setIsEditMode] = useState(false)

  const handleUpdateTodoStatus = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    onUpdateTodoStatus(todo.id, e.target.checked)
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
      data-testid={'todo-item'}
      id={`todo-item-${todo.id}`}
      onDoubleClick={handleDoubleClickItem}
    >
      <input
        data-testid={'checkbox-status'}
        type='checkbox'
        checked={isTodoCompleted(todo)}
        onChange={handleUpdateTodoStatus}
      />
      {
        isEditMode ? <input
          ref={inputRef}
          autoFocus //improve UX, user does not need to click into the input again to edit todo
          data-testid={'input-edit-todo'}
          className='TodoItem__input'
          placeholder={text.enterTodoName}
          onBlur={handleUpdateTodoContent}
          defaultValue={todo.content}
        />
          : <WithTooltip
            tooltipText={todo.content}
            id={'span-item-content'}
            useAnimation={todo.content.length > 50}
          ><span className={'item-text'}>{todo.content}</span></WithTooltip>
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