import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from 'App';
import { TodoStatus, Todo } from 'models/todo';
import {
  updateTodoStatus,
  deleteTodo,
} from 'store/actions';
import './index.scss';

export const TodoList = () => {
  const { todos, filter, dispatch } = useContext(TodoContext);
  const [todoShow, setTodoShow] = useState<Array<Todo>>([]);

  useEffect(() => {
    setTodoShow(todos.filter((todo: Todo) => !filter || todo.status === filter))
  }, [filter, todos])

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  }

  return (
    <div className="todo-list">
      {
        todoShow.map((todo: Todo, index: number) => {
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
                onClick={_ => onDeleteTodo(todo.id)}
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