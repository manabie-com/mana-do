import React, { useEffect, useReducer, useRef, useState } from 'react'

import reducer, { initialState } from './store/reducer'
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  filterTodo,
} from './store/actions'
import Service from './service'
import { TodoStatus } from './models/todo'
import CreateTodo from './components/FormTodo/CreateTodo'

import ToDoItem from './ToDoItem'

const ToDoPage = () => {
  const [filterName, setFilterName] = useState<string>('ALL')

  const [{ todos }, dispatch] = useReducer(reducer, initialState)

  const inputRef = useRef<any>(null)

  useEffect(() => {
    ;(async () => {
      const resp = await Service.getTodos()
      dispatch(setTodos(resp || []))
    })()
  }, [])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current.value) {
      const resp = await Service.createTodo(inputRef.current.value)
      await dispatch(createTodo(resp))
      dispatch(filterTodo(filterName))

      inputRef.current.value = ''
    }
  }

  const onToggleAllTodo = async(e: React.ChangeEvent<HTMLInputElement>) => {
    await dispatch(toggleAllTodos(e.target.checked))
    dispatch(filterTodo(filterName))
  }

  const onDeleteAllTodos = () => {
    dispatch(deleteAllTodos())
  }

  const onFilter = (filterName: string) => {
    dispatch(filterTodo(filterName))
    setFilterName(filterName)
  }

  return (
    <div className="ToDo__container">
      <CreateTodo
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
        forwardRef={inputRef}
      />
      <div className="ToDo__list">
        {todos && todos.length ? (
          todos.map((todo, index) => {
            return <ToDoItem filterName={filterName} dispatch={dispatch} key={index} todo={todo} />
          })
        ) : (
          <div>There are currently no to-do!</div>
        )}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button
            className={`btn SelectAll__btn ${
              filterName === 'ALL' && 'btn-active'
            }`}
            onClick={() => onFilter('ALL')}
          >
            All
          </button>
          <button
            className={`btn Active__btn ${
              filterName === TodoStatus.ACTIVE && 'btn-active'
            }`}
            onClick={() => onFilter(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`btn Completed__btn ${
              filterName === TodoStatus.COMPLETED && 'btn-active'
            }`}
            onClick={() => onFilter(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button
          className="btn ClearAll__btn btn-active"
          onClick={onDeleteAllTodos}
        >
          Clear all todos
        </button>
      </div>
    </div>
  )
}

export default ToDoPage
