import React, { memo, useContext, useEffect, useMemo } from 'react'

import { EnhanceTodoStatus, TodoContext } from 'src/context/TodoContext'
import { Todo, TodoStatus } from 'src/models/todo'

import TodoItem from 'src/components/Todo/TodoItem'

import './TodoList.css'
import Service from 'src/service'
import { setTodos } from 'src/store/actions'
import { useHistory } from 'react-router-dom'

const getVisibleTodos = (todos: Todo[], filter: EnhanceTodoStatus) => {
  switch (filter) {
    case TodoStatus.ACTIVE:
      return todos.filter((t) => t.status === TodoStatus.ACTIVE)
    case TodoStatus.COMPLETED:
      return todos.filter((t) => t.status === TodoStatus.COMPLETED)
    default:
      return todos
  }
}

const TodoList: React.FC = () => {
  const history = useHistory()
  const {
    state: { todos, visibilityFilter },
    dispatch,
  } = useContext(TodoContext)

  useEffect(() => {
    let isMounted = true
    const getTodos = async () => {
      try {
        const resp = await Service.getTodos()
        if (isMounted) {
          dispatch(setTodos(resp || []))
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          history.push('/')
        }
      }
    }
    getTodos()
    return () => {
      isMounted = false
    }
  }, [dispatch, history])

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, visibilityFilter),
    [todos, visibilityFilter]
  )

  return (
    <div data-testid='todoList' className='Todo__list'>
      {visibleTodos.map((todo) => {
        // Correct using key to prevent same key in the list
        return <TodoItem key={todo.id} todo={todo} />
      })}
    </div>
  )
}

export default memo(TodoList)
