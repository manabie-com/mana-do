import React, { useEffect, useState } from 'react'
import { Todo, TodoStatus } from '../models/todo'
import {
  AppActions,
  deleteTodo,
  updateTodoContent,
  updateTodoStatus
} from '../store/actions'

interface ITodoItem {
  todo: Todo
  dispatch: (value: AppActions) => void
}

const TodoItem: React.FC<ITodoItem> = ({ todo, dispatch }) => {
  const [toggle, setToggle] = useState<boolean>(true)
  const [editContent, setEditContent] = useState<string>('')

  useEffect(() => {
    setEditContent(todo.content)
  }, [todo.content])

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id))
  }
  const onChangeTodoContent = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string
  ) => {
    if (e.key === 'Enter' && editContent) {
      dispatch(updateTodoContent(todoId, editContent))
      setToggle(true)
    }
  }

  const onDiscardEdit = () => {
    setToggle(true)
    setEditContent(todo.content)
  }

  if (!toggle) {
    return (
      <div className='ToDo__item'>
        <input
          className='Todo__input'
          type='text'
          autoFocus
          maxLength={200}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onKeyDown={(e) => onChangeTodoContent(e, todo.id)}
          onBlur={onDiscardEdit}
        />
      </div>
    )
  }
  return (
    <div className='ToDo__item'>
      <div className='ToDo__item--left'>
        <input
          type='checkbox'
          checked={todo.status === TodoStatus.COMPLETED}
          onChange={(e) => onUpdateTodoStatus(e, todo.id)}
        />
        <p onDoubleClick={() => setToggle(false)}>{todo.content}</p>
      </div>
      <button className='Todo__delete' onClick={() => onDeleteTodo(todo.id)}>
        X
      </button>
    </div>
  )
}

export default TodoItem
