import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import { AppActions, deleteTodo, updateTodoContent } from '@/store/actions'
import useOutsideAlerter from '@/hooks/useOutsideAlerter'
import { Todo, TodoStatus } from '@/models/todo'
import InputField from '@/components/input-field'
import { dispatchForCode } from '@/utils'

import './style.scss'

interface IProps {
  todo: Todo
  onUpdateTodoStatus: (
    event: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => void
  onDeleteTodo: (todoId: string) => void
  dispatch: React.Dispatch<AppActions>
}

const TodoItem: React.FC<IProps> = ({
  todo,
  onUpdateTodoStatus,
  onDeleteTodo,
  dispatch
}) => {
  const [showEdit, setShowEdit] = useState(false)
  const [editValue, setEditValue] = useState(todo.content)
  const todoItemRef = React.useRef<HTMLDivElement>(null)
  const inputEditRef = React.useRef<HTMLInputElement>(null)

  /**
   * Hide edit input when click outside todo div
   */
  useOutsideAlerter(todoItemRef, () => {
    setShowEdit(false)
    setEditValue(todo.content)
  })

  const onSaveTodo = useCallback(
    (newTodoValue: string) => {
      if (!newTodoValue.trim()) {
        /**
         * Delete todo when user clear content
         * This depend to business rules
         */
        dispatch(deleteTodo(todo.id))
      } else {
        /**
         * Call update todo action
         */
        dispatch(updateTodoContent(todo.id, newTodoValue.trim()))
      }
    },
    [dispatch, todo.id]
  )

  const handleDoubleClick = () => {
    // Handle double click function
    setShowEdit(true)
  }

  const handleClickTodo = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.detail === 2) {
      // Detect double click
      handleDoubleClick()
    }
  }

  const handleChangeEditInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target
    setEditValue(value)
  }

  const handleKeyupEditInput = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      dispatchForCode(event, (key) => {
        /**
         * Hide input when user do with keys event: Enter || Esc
         */
        if ([13, 'Enter', 'Escape'].includes(key || '')) {
          setShowEdit(false)
          /**
           * Call save todo function when user exit edit
           */
          onSaveTodo(editValue)
        }
      })
    },
    [editValue, onSaveTodo]
  )

  useEffect(() => {
    if (showEdit === true && inputEditRef.current) {
      /**
       * Auto focus edit input
       */
      inputEditRef.current.focus()
    }
  }, [showEdit])

  return (
    <div
      className={clsx(
        'todo-item',
        todo.status === TodoStatus.COMPLETED && 'todo-item--completed'
      )}
      onClick={handleClickTodo}
      ref={todoItemRef}
    >
      <InputField
        className={clsx(
          'todo-item__checkbox',
          showEdit && 'todo-item__checkbox--hidden'
        )}
        type="checkbox"
        checked={todo.status === TodoStatus.COMPLETED}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      {showEdit ? (
        <div className="todo-item__content todo-item__content--edit">
          <InputField
            className="edit-input"
            value={editValue}
            ref={inputEditRef}
            onChange={handleChangeEditInput}
            onKeyUp={handleKeyupEditInput}
          />
        </div>
      ) : (
        <span className="todo-item__content todo-item__content--display">
          {todo.content}
        </span>
      )}
      {!showEdit && (
        <button
          onClick={() => onDeleteTodo(todo.id)}
          className="todo-item__delete-btn"
        >
          X
        </button>
      )}
    </div>
  )
}

export default TodoItem
