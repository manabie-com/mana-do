
import React from 'react'
import Button from '../../ui/button/Button';
import { Todo } from '../../models/todo';
import './TodoToolbar.css'


interface Props {
  todos: Todo[]
  isShowAll: boolean
  onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDeleteAllTodo: () => void
  onToggleCompletedTodo: () => void
}

const TodoToolbar = ({ todos, isShowAll, onToggleAllTodo, onDeleteAllTodo, onToggleCompletedTodo }: Props) => {

  const isTodos = () => {
    return todos.length > 0
  }

  return (
    <div className="ToDoToolbar__container">
      {isTodos() && (
        <div className="ToDoToolbar__actions">
          <input
            data-testid='todo-toolbar-checkbox'
            type="checkbox"
            onChange={onToggleAllTodo}
          />
            <Button
              dataTestId='todo-toolbar-complete-button'
              className={`ToDoToolbar__actions--hide ${isShowAll ? 'ToDoToolbar__actions--active' : ''}`} 
              variant="primary" 
              onClick={onToggleCompletedTodo}
            >
              Completed Tasks
            </Button>
          <Button
            dataTestId='todo-toolbar-delete-button'
            className="ToDoToolbar__actions--delete" 
            variant="primary" 
            onClick={onDeleteAllTodo}
          >
            Clear all todos
          </Button>
        </div>
      )}

    </div>
  )
}

export default TodoToolbar