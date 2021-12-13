import React from 'react'

import { isTodoCompleted } from '../../utils';
import {Todo } from '../../models/todo';
import './TodoItem.css'

interface Props {
  todo: Todo
  editInputRef: React.RefObject<HTMLInputElement>
  editTodoItem: Todo | null
  setEditTodoItem: (todo: Todo | null) => void
  onEditTodo: (todo: Todo) => Promise<void>
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void
  onDeleteTodo: (todo: Todo) => void
}

const TodoItem = ({ todo, editInputRef, editTodoItem, setEditTodoItem, onEditTodo, onUpdateTodoStatus, onDeleteTodo } : Props) => {
  const handleEditTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //Ignore enter key when there is no value
    if (e.key === 'Enter' && editTodoItem && editTodoItem.content !== '') {
      onEditTodo(editTodoItem)
      setEditTodoItem(null)
    }
  }

  return (
    <div className="ToDoItem__container">
      <input
          data-testid='todo-item-checkbox'
          type="checkbox"
          checked={isTodoCompleted(todo)}
          onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      {/* Add a condition to display input when there is an edit item and it's equal to todo item id */}
      {editTodoItem && editTodoItem.id === todo.id ? (
        <input
          data-testid='todo-item-edit'
          ref={editInputRef}
          className='ToDoItem__input'
          value={editTodoItem.content}
          onKeyDown={handleEditTodo}
          onChange={(e) => {
            setEditTodoItem({...todo, content: e.target.value})
          }}
        />
      ) : (
        <span data-testid='todo-item-span' className={`${isTodoCompleted(todo) ? 'ToDoItem__input--completed' : ''}`}onDoubleClick={() => setEditTodoItem(todo)}>{todo.content}</span>
      )}
      
      <button
        data-testid="todo-item-delete"
        className="ToDoItem__delete"
        onClick={() => onDeleteTodo(todo)}
      >
        delete
      </button>
    </div>
  )
}


export default TodoItem