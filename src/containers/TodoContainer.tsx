import React from 'react'

import TodoList from 'src/components/Todo/TodoList'
import InputTodo from 'src/components/Todo/InputTodo'
import TodoToolbar from 'src/components/Todo/TodoToolbar'

import './TodoContainer.css'

const TodoContainer = () => {
  return (
    <div className='Todo__container'>
      <InputTodo />
      <TodoList />
      <TodoToolbar />
    </div>
  )
}

export default TodoContainer
