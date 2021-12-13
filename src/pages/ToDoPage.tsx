import React, { useEffect, useReducer, useState } from 'react'

import reducer, { initialState } from '../store/reducer'
import {
  createTodo,
  setTodos,
  editTodo,
  deleteTodo,
  updateTodoStatus,
  toggleAllTodos,
  deleteAllTodos,
} from '../store/actions'
import Service from '../service'
import { useHistory } from 'react-router'
import { Todo } from '../models/todo'

import TodoList from '../components/todo/TodoList'
import TodoToolbar from '../components/todo/TodoToolbar'
import TodoInput from '../components/todo/TodoInput'

import AuthWrapper from '../components/auth/AuthWrapper'
import Button from '../ui/button/Button'


const ToDoPage = () => {
  const history = useHistory()
  const [{todos}, dispatch] = useReducer(reducer, initialState)
  const [isShowAll, setShowAll] = useState<boolean>(true)

  useEffect(()=>{
    (async ()=>{
      const resp = await Service.getTodos()

      dispatch(setTodos(resp || []))
    })()
  }, [])


  const onCreateTodo = async (todoContent: string) => {
    Service.createTodo(todoContent)
      .then(resp => {
        dispatch(createTodo(resp))
        setShowAll(true)
      })
      .catch(e => {
        if (e.response.status === 401) {
          history.push('/')
        }
      })
  }

  const onEditTodo = async (todo: Todo) => {
    Service.editTodo(todo)
      .then(resp => {
        dispatch(editTodo(resp))
      })
      .catch(e => {
        if (e.response.status === 401) {
          history.push('/')
        }
      })
  }

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onDeleteTodo = (todo: Todo) => {
    dispatch(deleteTodo(todo.id))
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos())
  }

  const onToggleCompletedTodo = () => {
    setShowAll(!isShowAll)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    history.push('/')
  }

    return (
      <AuthWrapper>
      <div className="Page__container">
          <div className="Page__logout">
            <Button variant="primary" onClick={handleLogout}>Logout</Button>
          </div>
          <div className="ToDo__container">
            <TodoInput onCreateTodo={onCreateTodo}/>
            <TodoToolbar 
              todos={todos}
              isShowAll={isShowAll}
              onToggleAllTodo={onToggleAllTodo}
              onDeleteAllTodo={onDeleteAllTodo}
              onToggleCompletedTodo={onToggleCompletedTodo}
            />
            <TodoList 
              todos={todos}
              isShowAll={isShowAll}
              onEditTodo={onEditTodo}
              onUpdateTodoStatus={onUpdateTodoStatus}
              onDeleteTodo={onDeleteTodo}
            />
          </div>
        </div>
      </AuthWrapper>
    )
}

export default ToDoPage