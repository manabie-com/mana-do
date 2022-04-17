import React, { useMemo } from 'react'
import clsx from 'clsx'
import { Todo, TodoStatus } from '@/models/todo'
import { AppActions, deleteCompletedTodos } from '@/store/actions'
import { EnhanceTodoStatus } from '@/pages/todo'
import { capitalizeFirstLetter } from '@/utils'

import './style.scss'

interface IProps {
  todos: Todo[]
  currentStatus: EnhanceTodoStatus
  onClickStatus: (status: EnhanceTodoStatus) => void
  dispatch: React.Dispatch<AppActions>
}

const Statuses: EnhanceTodoStatus[] = [
  'ALL',
  TodoStatus.ACTIVE,
  TodoStatus.COMPLETED
]

const ToolBar: React.FC<IProps> = ({
  todos,
  currentStatus,
  onClickStatus,
  dispatch
}) => {
  const onDeleteCompletedTodo = () => {
    dispatch(deleteCompletedTodos())
  }

  const leftTodo = useMemo(() => {
    return todos.filter((todo) => todo.status === TodoStatus.ACTIVE)
  }, [todos])

  const isExistedCompleted = useMemo(() => {
    return todos.some((todo) => todo.status === TodoStatus.COMPLETED)
  }, [todos])

  return (
    <div className="toolbar">
      <label>{`${leftTodo.length} todo${
        leftTodo.length > 1 ? 's' : ''
      } left`}</label>
      <div className="toolbar__statuses">
        {Statuses.map((status) => (
          <label
            key={status}
            className={clsx('status', status === currentStatus && 'active')}
            onClick={() => onClickStatus(status)}
          >
            {capitalizeFirstLetter(status)}
          </label>
        ))}
      </div>
      {isExistedCompleted ? (
        <label className="toolbar__clear-btn" onClick={onDeleteCompletedTodo}>
          Clear completed
        </label>
      ) : (
        <div />
      )}
    </div>
  )
}

export default ToolBar
