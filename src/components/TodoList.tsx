import React from 'react'
import { Todo } from '../models/todo'
import { AppActions } from '../store/actions'
import TodoItem from './TodoItem'

interface ITodoList {
  todos: Todo[]
  dispatch: (value: AppActions) => void
}

const TodoList: React.FC<ITodoList> = ({ todos, dispatch }) => {
  return (
    <div className='ToDo__list'>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      })}
    </div>
  )
}

export default TodoList
