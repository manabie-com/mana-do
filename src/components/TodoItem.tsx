import React, { memo, useRef, useState } from 'react'
import { OuterClick } from 'react-outer-click'
import { TODO_MAX_CONTENT_LENGTH } from '../config/constants'
import { Todo, TodoStatus } from '../models/todo'
import { deleteTodo, updateTodo } from '../store/actions'
import { AppActions } from '../types/actions'

interface IProps {
  todo: Todo
  dispatch: React.Dispatch<AppActions>
}

const TodoItem: React.FC<IProps> = memo(function TodoItem({ todo, dispatch }: IProps) {
  const [checked, setChecked] = useState(todo.status === TodoStatus.COMPLETED)
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState('')
  const inputRef = useRef<any>(null)

  const onUpdateTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
    setChecked(e.target.checked)
    dispatch(updateTodo(todo.id, { status }))
  }

  const onDeleteTodo = (todoId: string): void => {
    if (editing) {
      resetEditState()
      return
    }

    dispatch(deleteTodo(todoId))
  }

  const toggleEdit = () => {
    setContent(todo.content)
    setEditing(true)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (content.length <= TODO_MAX_CONTENT_LENGTH) {
      setContent(e.target.value)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const handleKeys = ['Escape', 'Enter']
    if (handleKeys.includes(e.key)) {
      e.preventDefault()
      e.stopPropagation()

      if (e.key === handleKeys[1] && content.length) {
        dispatch(updateTodo(todo.id, { content }))
      }

      resetEditState()
    }
  }

  const resetEditState = () => {
    setContent('')
    setEditing(false)
  }

  return (
    <div key={todo.id} className="ToDo__item">
      <div className="is-left">
        <OuterClick onOuterClick={resetEditState}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onUpdateTodo(e)}
            className="ToDo__item-toggle"
          />
        </OuterClick>

        {!editing ? (
          <span className="ToDo__content" onDoubleClick={toggleEdit}>
            {todo.content}
          </span>
        ) : (
          <>
            <input
              ref={inputRef}
              type="text"
              value={content}
              className="inline-input"
              onChange={onChange}
              onKeyDown={onKeyDown}
              autoFocus
            />
            <span className="cancel-edit-text">Cancel {'->'}</span>
          </>
        )}
      </div>
      <button className="Todo__delete" onClick={() => onDeleteTodo(todo.id)}>
        X
      </button>
    </div>
  )
})

export default TodoItem
