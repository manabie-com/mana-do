import React, { useState, useContext } from 'react';
import { TodoContext } from 'ToDoPage';
import { TodoStatus, Todo } from 'models/todo';
import {
  updateTodoStatus,
} from 'store/actions';

type EnhanceTodoStatus = TodoStatus | 'ALL';

export const TodoList = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL')

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  return (
    <div className="Todo__list">
      {
        todos.map((todo: Todo, index: number) => {
          return (
            <div key={index} className="Todo__item">
              <input
                type="checkbox"
                checked={showing === todo.status}
                onChange={(e) => onUpdateTodoStatus(e, index)}
              />
              <span>{todo.content}</span>
              <button
                className="Todo__delete"
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