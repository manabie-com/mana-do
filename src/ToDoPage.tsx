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
import TodoList from './component/TodoList'
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
  const [error, setError] = useState('')

  useEffect(() => {
    const todosLocalStorage = localStorage.getItem('todos')
    const todosParse = JSON.parse(todosLocalStorage || '[]')
    dispatch(setTodos(todosParse))
  }, [])

  useEffect(() => {
    setListTodos(todos.filter(e => e.status === filter || !filter))
  }, [todos, filter])

  useEffect(() => {
    let timeOutError: any = null
    if (error) {
      timeOutError = setTimeout(() => {
        setError('')
      }, 3000)
    }
    return () => clearTimeout(timeOutError)
  }, [error])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !inputRef.current.value) {
      setError(`Please enter content, content can't be empty !`)
      return
    }
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
    setFilter('')
  }

  const onUpdateData = React.useCallback((itemEdit, values) => {
    dispatch(updateTodoData(itemEdit.id, values))
  }, [])

  const onRemoveItem = React.useCallback(idItem => {
    dispatch(deleteItemTodoData(idItem))
  }, [])

  const onError = React.useCallback((mess: string) => {
    setError(mess)
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
          autoFocus
        />
      </div>
      <div className="ToDo__list">
        <div className="Todo__error">{error}</div>
        <TodoList
          listTodos={listTodos}
          onRemoveItem={onRemoveItem}
          onUpdateData={onUpdateData}
          filter={filter}
          onError={onError}
        />
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
