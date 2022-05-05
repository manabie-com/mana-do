import React, { useEffect, useReducer, useRef, useState } from 'react'

import reducer, { initialState } from './store/reducer'
import {
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  deleteItemTodoData,
  updateTodoData,
  setTodos,
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
  const checkAllRef = useRef<any>(null)
  const [listTodos, setListTodos] = useState(todos)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const todosLocalStorage = localStorage.getItem('todos')
    const todosParse = JSON.parse(todosLocalStorage || '[]')
    dispatch(setTodos(todosParse))
  }, [])

  useEffect(() => {
    setListTodos(todos.filter(e => e.status === filter || !filter))
  }, [todos, filter])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current.value) {
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
    setFilter('')
  }

  const onUpdateData = React.useCallback((itemEdit, values) => {
    dispatch(updateTodoData(itemEdit.id, values))
  }, [])

  const onRemoveItem = React.useCallback(idItem => {
    dispatch(deleteItemTodoData(idItem))
  }, [])

  const onFilter = (evt: any) => {
    if (!evt) {
      setListTodos(todos)
    }
    setFilter(evt)
  }

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
        {listTodos?.length > 0 ? (
          listTodos.map(todo => {
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
          <div>{filter ? `No data for filter ${filter}` : 'No data'}</div>
        )}
      </div>
      <div className="Todo__toolbar">
        <input
          type="checkbox"
          onChange={onToggleAllTodo}
          checked={!listTodos.some(e => e.status === TodoStatus.ACTIVE)}
          ref={checkAllRef}
          style={{ visibility: listTodos.length > 1 ? 'visible' : 'hidden' }}
        />

        <div className="Todo__tabs">
          {ArrayButtons.map(e => {
            return (
              <button
                key={e.value}
                className={`Action__btn ${e.className} ${
                  e.value === filter && 'Action__btn--actived'
                }`}
                onClick={() => onFilter(e.value)}
              >
                {e.label}
              </button>
            )
          })}
        </div>
        <button
          className="Action__btn Action__btn--clear"
          onClick={onDeleteAllTodo}
        >
          Clear all todos
        </button>
      </div>
    </div>
  )
}

export default ToDoPage
