import React, { memo, useContext, useMemo } from 'react'

import { EnhanceTodoStatus, TodoContext } from '../../context/TodoContext'
import { Todo, TodoStatus } from '../../models/todo'
import TodoItem from './TodoItem'

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
  const {
    state: { todos, visibilityFilter },
  } = useContext(TodoContext)

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, visibilityFilter),
    [todos, visibilityFilter]
  )

  return (
    <div className='ToDo__list'>
      {visibleTodos.map((todo) => {
        // Correct using key to prevent same key in the list
        return <TodoItem key={todo.id} todo={todo} />
      })}
    </div>
  )
}

export default memo(TodoList)
