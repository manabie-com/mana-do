import React, { FC, memo, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { TodoContext } from 'src/context/TodoContext'
import { Todo, TodoStatus } from 'src/models/todo'
import Service from 'src/service/index'
import { deleteTodo, updateTodo } from 'src/store/actions'
import { isTodoCompleted } from 'src/utils/index'
import Checkbox from 'src/components/Checkbox'
import TrashIcon from 'src/components/Icons/TrashIcon'
import EditableContent from './EditableContent'

import './TodoItem.css'

interface IProps {
  todo: Todo
}

const TodoItem: FC<IProps> = ({ todo }) => {
  const { dispatch } = useContext(TodoContext)
  const history = useHistory()
  const [isEdit, setIsEdit] = useState(false)

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

  const onUpdateContent = async (content: string) => {
    try {
      const nextTodo = await Service.updateTodo({
        ...todo,
        content,
      })

      dispatch(updateTodo(nextTodo))
      setIsEdit(false)
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
    <div
      className={`Todo__item ${
        todo.status === TodoStatus.COMPLETED ? 'Todo__item--completed' : ''
      }`}
    >
      <Checkbox checked={isTodoCompleted(todo)} onChange={onToggleComplete} />
      {isEdit ? (
        <EditableContent
          todo={todo}
          onUpdate={onUpdateContent}
          onCancel={() => setIsEdit(false)}
        />
      ) : (
        <div className='Todo__content' onDoubleClick={() => setIsEdit(true)}>
          {todo.content}
        </div>
      )}
      <div className='Todo__actions'>
        <span className='Todo__delete' title='Delete' onClick={onDelete}>
          <TrashIcon />
        </span>
      </div>
    </div>
  )
}

export default memo(TodoItem)
