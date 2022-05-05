import React, { useEffect, useReducer, useRef } from 'react'

import reducer, { initialState } from './store/reducer'
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  deleteItemTodoData,
  updateTodoData,
} from './store/actions'
import Service from './service'
import TodoItem from './component/TodoItem'
import { TodoStatus } from './models/todo'

const ArrayButtons = [
  { label: 'All', className: 'Action_btn--all', value: '' },
  {
    label: 'Active',
    className: 'Action_btn--active',
    value: TodoStatus.ACTIVE,
  },
  {
    label: 'Completed',
    className: 'Action_btn--completed',
    value: TodoStatus.COMPLETED,
  },
]

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState)
  const inputRef = useRef<any>(null)

  useEffect(() => {
    ;(async () => {
      const resp = await Service.getTodos()

      dispatch(setTodos(resp || []))
    })()
  }, [])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const resp = await Service.createTodo(inputRef.current.value)
      dispatch(createTodo(resp))
      inputRef.current.value = ''
    }
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos())
  }

  const onUpdateData = React.useCallback((itemEdit, values) => {
    dispatch(updateTodoData(itemEdit.id, values))
  }, [])

  const onRemoveItem = React.useCallback(idItem => {
    dispatch(deleteItemTodoData(idItem))
  }, [])

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {todos?.length > 0 ? (
          todos.map((todo, index) => {
            return (
              <TodoItem
                onRemoveItem={onRemoveItem}
                key={todo.id + todo.status}
                data={todo}
                onUpdateData={onUpdateData}
              />
            )
          })
        ) : (
          <div>No data</div>
        )}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          {ArrayButtons.map(e => {
            return (
              <button key={e.value} className={`Action__btn ${e.className}`}>
                {e.label}
              </button>
            )
          })}
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  )
}

export default ToDoPage
