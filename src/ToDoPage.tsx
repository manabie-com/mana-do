import React from 'react'

import TodoList from './components/Todo/TodoList'
import InputTodo from './components/Todo/InputTodo'
import TodoToolbar from './components/Todo/TodoToolbar'

const TodoPage = () => {
  return (
    <div className='ToDo__container'>
      <InputTodo />
      <TodoList />
      <TodoToolbar />
    </div>
  )
}

export default TodoPage
