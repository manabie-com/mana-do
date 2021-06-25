import React, { memo, useContext, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { EnhanceTodoStatus, TodoContext } from 'src/context/TodoContext'
import { TodoStatus } from 'src/models/todo'
import Service from 'src/service/index'
import {
  deleteAllTodos,
  setVisibilityFilter,
  toggleAllTodos,
} from 'src/store/actions'
import Button from 'src/components/Button'
import Checkbox from 'src/components/Checkbox'
import { isTodoCompleted } from 'src/utils/index'

import './TodoToolbar.css'

const filters: EnhanceTodoStatus[] = [
  'ALL',
  TodoStatus.ACTIVE,
  TodoStatus.COMPLETED,
]

const TodoToolbar: React.FC = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(TodoContext)
  const { todos, visibilityFilter } = state

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
        <Checkbox
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
            <Button
              key={flt}
              disabled={todos.length === 0}
              className={`${
                flt === visibilityFilter ? 'Button__filter--active' : ''
              }`}
              onClick={() => onFilterClick(flt)}
            >
              {flt}
            </Button>
          )
        })}
      </div>
      <Button
        danger
        disabled={todos.length === 0}
        className='Todo__clear-all'
        onClick={onDeleteAllTodo}
      >
        Clear all todos
      </Button>
    </div>
  )
}

export default memo(TodoToolbar)
