import React, { useState, memo } from 'react'

import { isTodoCompleted, getTodoStatus } from '../../../utils'

import { Todo } from '../../../models/todo'
import { KEYBOARD_KEY } from '../../../common/constants'

import TodoInput from '../../todo-input'

import styles from './todo-list-item.module.css'

interface TodoListItemProps {
  todo: Todo
  handleUpdateTodo: (todo: Todo) => void
  handleDeleteTodo: (id: string) => void
}

const TodoListItem = ({
  todo,
  handleUpdateTodo,
  handleDeleteTodo
}: TodoListItemProps): JSX.Element => {
  const [value, setValue] = useState(todo.content)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)

    if (e.target.value === '') return setError(true)

    setError(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === KEYBOARD_KEY.ESCAPE) {
      setValue(todo.content)
      setIsEditing(false)
      setError(false)
    }

    if (e.key === KEYBOARD_KEY.ENTER) {
      if (value === '') return setError(true)

      handleUpdateTodo({ ...todo, content: value })
      setIsEditing(false)
      setError(false)
    }
  }

  const handleBlur = (): void => {
    setValue(todo.content)
    setIsEditing(false)
    setError(false)
  }

  return (
    <div className={styles.item}>
      {!isEditing && (
        <TodoInput
          type='checkbox'
          checked={isTodoCompleted(todo.status)}
          onChange={(e) => handleUpdateTodo({ ...todo, status: getTodoStatus(e.target.checked) })}
        />
      )}

      {isEditing && (
        <TodoInput
          className={`${styles.input} ${error ? styles.error : ''}`}
          value={value}
          autoFocus
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          data-testid='edit-input'
        />
      )}

      {!isEditing && (
        <span onDoubleClick={() => setIsEditing(true)}>
          {todo.content}
        </span>
      )}

      {!isEditing && (
        <button className={styles.delete} onClick={() => handleDeleteTodo(todo.id)} data-testid='delete-button'>
          X
        </button>
      )}
    </div>
  )
}

export default memo(TodoListItem)
