import React, { useEffect, useReducer, useRef, useState } from 'react'

import reducer, { initialState } from './store/reducer'
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos
} from './store/actions'
import Service from './service'
import { TodoStatus } from './models/todo'
import TodoItem from './TodoItem'

type EnhanceTodoStatus = TodoStatus | 'ALL'

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState)
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL')
  const inputRef = useRef<any>(null)

  useEffect(() => {
    ;(async () => {
      const resp = await Service.getTodos()
      dispatch(setTodos(resp))
    })()
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

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
  }
  const filteredTodos =
    showing === 'ALL' ? todos : todos.filter((todo) => todo.status === showing)
  return (
    <div className='ToDo__container'>
      <div className='Todo__creation'>
        <input
          maxLength={200}
          ref={inputRef}
          className='Todo__input'
          placeholder='What need to be done?'
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className='Todo__toolbar'>
        {filteredTodos.length > 0 ? (
          <input
            type='checkbox'
            onChange={onToggleAllTodo}
            checked={
              !todos.some((todo) => todo.status !== TodoStatus.COMPLETED)
            }
          />
        ) : (
          <div style={{ height: 42, width: 31 }} />
        )}
        <div className='Todo__tabs'>
          <select
            className='Todo__filter'
            onChange={(e) => setShowing(e.target.value as EnhanceTodoStatus)}
          >
            <option value='ALL'>All</option>
            <option value={TodoStatus.ACTIVE}>Active</option>
            <option value={TodoStatus.COMPLETED}>Complete</option>
          </select>
        </div>
        <button className='Action__btn' onClick={onDeleteAllTodo}>
          Clear all
        </button>
      </div>
      <div className='ToDo__list'>
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
        })}
      </div>
    </div>
  )
}

export default ToDoPage
