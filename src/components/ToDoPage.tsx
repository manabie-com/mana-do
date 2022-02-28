import React, { useEffect, useReducer, useState } from 'react'
import reducer, { initialState } from '../store/reducer'
import { setTodos } from '../store/actions'
import Service from '../service'
import { TodoStatus } from '../models/todo'
import AddTodo from './AddTodo'
import Toolbar from './Toolbar'
import TodoList from './TodoList'

export type EnhanceTodoStatus = TodoStatus | 'ALL'

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState)
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL')

  useEffect(() => {
    ;(async () => {
      const resp = await Service.getTodos()
      dispatch(setTodos(resp))
    })()
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const filteredTodos =
    showing === 'ALL' ? todos : todos.filter((todo) => todo.status === showing)
  return (
    <div className='ToDo__container'>
      <AddTodo dispatch={dispatch} />
      <Toolbar
        filteredTodos={filteredTodos}
        todos={todos}
        dispatch={dispatch}
        setShowing={setShowing}
      />
      <TodoList todos={filteredTodos} dispatch={dispatch} />
    </div>
  )
}

export default ToDoPage
