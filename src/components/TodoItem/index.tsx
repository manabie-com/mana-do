import React from 'react'

import {isTodoCompleted} from '../../utils';

import type {TodoItemProps} from './type'

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { todo, onChangeStatus, onDelete } = props
  return (
    <div key={todo.id} className="ToDo__item">
        <input
            type="checkbox"
            checked={isTodoCompleted(todo)}
            onChange={(e) => onChangeStatus(e, todo.id)}
        />
        <span>{todo.content}</span>
        <button
            className="Todo__delete"
            onClick={(e) => onDelete(e, todo.id)}
        >
            X
        </button>
    </div>
  )
}

export * from './type'
export {TodoItem}