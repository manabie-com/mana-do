import React, { useEffect, useReducer, useRef, useState } from 'react'

import reducer, { initialState } from './store/reducer'
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo
} from './store/actions'
import Service from './service'
import { TodoStatus } from './models/todo'

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

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id))
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
            onChange={(e) => setShowing(e.target.value as EnhanceTodoStatus)}
          >
            <option value='ALL'>All</option>
            <option value={TodoStatus.ACTIVE}>Active</option>
            <option value={TodoStatus.COMPLETED}>Complete</option>
          </select>
        </div>
        <button className='Action__btn' onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
      <div className='ToDo__list'>
        {filteredTodos.map((todo, index) => {
          return (
            <div key={index} className='ToDo__item'>
              <input
                type='checkbox'
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <button
                className='Todo__delete'
                onClick={() => onDeleteTodo(todo.id)}
              >
                X
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ToDoPage
