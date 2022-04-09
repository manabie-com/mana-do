import React, { useContext } from 'react';
import { TodoContext } from 'App';
import { TodoStatus, Todo } from 'models/todo';
import {
  updateTodoStatus,
} from 'store/actions';
import './index.scss';

export const TodoList = () => {
  const { todos, dispatch } = useContext(TodoContext);

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  return (
    <div className="todo-list">
      {
        todos.map((todo: Todo, index: number) => {
          return (
            <div key={index} className="todo-list__item">
              <input
                type="checkbox"
                checked={TodoStatus.COMPLETED === todo.status}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <button
                className="todo-list__item__delete"
              >
                X
              </button>
            </div>
          );
        })
      }
    </div>
  )
}