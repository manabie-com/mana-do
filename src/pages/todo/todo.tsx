import React, { useEffect, useContext, useMemo } from 'react'

import { TodoContext } from '../../store/contexts/todo'
import { fetchTodos, setTodos } from '../../store/actions/todo'
import Service from '../../service'
import { TodoStatus } from '../../models/todo'

import CreateTodoForm from '../../components/create-todo-form'
import TodoList from '../../components/todo-list'
import TodoToolbar from '../../components/todo-toolbar'
import Spinner from '../../components/spinner'

import { useStorage } from '../../utils/hooks'

import styles from './todo.module.css'

const TodoPage = (): JSX.Element => {
  const [data, setData] = useStorage('todos')
  const [{ todos, displayFilter, loading }, dispatch] = useContext(TodoContext)

  useEffect(() => {
    dispatch(fetchTodos())

    if (data !== null) {
      dispatch(setTodos(JSON.parse(data)))

      return
    }

    Service.getTodos()
      .then(res => dispatch(setTodos(res)))
      .catch(console.error)

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setData(JSON.stringify(todos))
  }, [todos, setData])

  const visibleTodos = useMemo(() => todos.filter((todo) => {
    switch (displayFilter) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED
      default:
        return true
    }
  }), [todos, displayFilter])

  return (
    <div className={styles.container}>
      <CreateTodoForm />

      {loading && <Spinner />}

      {!loading && (
        <TodoList todos={visibleTodos} />
      )}

      <TodoToolbar />
    </div>
  )
}

export default TodoPage
