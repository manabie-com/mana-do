import React, { memo, useContext, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { EnhanceTodoStatus, TodoContext } from '../../context/TodoContext'
import { TodoStatus } from '../../models/todo'
import Service from '../../service'
import {
  deleteAllTodos,
  setVisibilityFilter,
  toggleAllTodos,
} from '../../store/actions'
import { isTodoCompleted } from '../../utils'

const filters: EnhanceTodoStatus[] = [
  'ALL',
  TodoStatus.ACTIVE,
  TodoStatus.COMPLETED,
]

const TodoToolbar: React.FC = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(TodoContext)
  const { todos } = state

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteAllTodo = async () => {
    try {
      await Service.deleteAllTodo()
      dispatch(deleteAllTodos())
    } catch (error) {
      if (error?.response?.status) {
        history.push('/')
      }
    }
  }

  const activeTodos = useMemo(() => {
    return todos.reduce(
      (accum, todo) => (isTodoCompleted(todo) ? accum : accum + 1),
      0
    )
  }, [todos])

  const onFilterClick = (filter: EnhanceTodoStatus) => {
    dispatch(setVisibilityFilter(filter))
  }

  return (
    <div className='Todo__toolbar'>
      {todos.length > 0 ? (
        <input
          type='checkbox'
          checked={activeTodos === 0}
          onChange={onToggleAllTodo}
        />
      ) : (
        <div />
      )}
      <div className='Todo__tabs'>
        {filters.map((flt) => {
          return (
            <button
              key={flt}
              className='Action__btn'
              onClick={() => onFilterClick(flt)}
            >
              {flt}
            </button>
          )
        })}
      </div>
      <button className='Action__btn' onClick={onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  )
}

export default memo(TodoToolbar)
