import React from 'react'
import { Todo, TodoStatus } from '../models/todo'
import { AppActions, deleteAllTodos, toggleAllTodos } from '../store/actions'
import { EnhanceTodoStatus } from './ToDoPage'

interface IToolbar {
  filteredTodos: Todo[]
  todos: Todo[]
  dispatch: (value: AppActions) => void
  setShowing: React.Dispatch<React.SetStateAction<EnhanceTodoStatus>>
}

const Toolbar: React.FC<IToolbar> = ({
  filteredTodos,
  todos,
  dispatch,
  setShowing
}) => {
  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos())
  }

  return (
    <div className='Todo__toolbar'>
      {filteredTodos.length > 0 ? (
        <input
          type='checkbox'
          onChange={onToggleAllTodo}
          checked={!todos.some((todo) => todo.status !== TodoStatus.COMPLETED)}
        />
      ) : (
        <div style={{ height: 46, width: 31 }} />
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
  )
}

export default Toolbar
