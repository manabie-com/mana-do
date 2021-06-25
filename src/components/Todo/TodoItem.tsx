import React, { FC, memo, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { TodoContext } from '../../context/TodoContext'
import { Todo, TodoStatus } from '../../models/todo'
import Service from '../../service'
import { deleteTodo, updateTodo } from '../../store/actions'
import { isTodoCompleted } from '../../utils'

interface IProps {
  todo: Todo
}

const TodoItem: FC<IProps> = ({ todo }) => {
  const { dispatch } = useContext(TodoContext)
  const history = useHistory()

  const onError = (error: any) => {
    if (error?.response?.status === 401) {
      history.push('/')
    }
  }

  const onToggleComplete = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { checked } = e.target
      const nextTodo = await Service.updateTodo({
        ...todo,
        status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
      })

      dispatch(updateTodo(nextTodo))
    } catch (error) {
      onError(error)
    }
  }

  const onDelete = async () => {
    try {
      await Service.deleteTodo(todo.id)
      dispatch(deleteTodo(todo.id))
    } catch (error) {
      onError(error)
    }
  }

  return (
    <div className='ToDo__item'>
      <input
        type='checkbox'
        checked={isTodoCompleted(todo)}
        onChange={onToggleComplete}
      />
      <span>{todo.content}</span>
      <button className='Todo__delete' onClick={onDelete}>
        X
      </button>
    </div>
  )
}

export default memo(TodoItem)
