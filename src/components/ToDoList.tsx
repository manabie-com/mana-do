import React, { useCallback } from 'react';
import { Todo, TodoStatus } from '../models/todo';

export interface ToDoListProps {
  showActive: boolean;
  showCompleted: boolean;
  todos: Array<Todo>;
  onDeleteTodo: (id: string) => any;
  onUpdateTodoStatus: (id: string, completed: boolean) => any;
}

const ToDoList: React.FC<ToDoListProps> = ({
  showActive,
  showCompleted,
  todos,
  onDeleteTodo,
  onUpdateTodoStatus,
}) => {
  const handleDeleteTodo = useCallback(
    (id: string) => () => onDeleteTodo(id),
    [onDeleteTodo]
  );

  const handleUpdateTodoStatus = useCallback(
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      onUpdateTodoStatus(id, e.target.checked),
    [onUpdateTodoStatus]
  );

  return (
    <div className="ToDo__list">
      {todos
        .filter(
          (todo) =>
            (showActive && todo.status === TodoStatus.ACTIVE) ||
            (showCompleted && todo.status === TodoStatus.COMPLETED)
        )
        .map((todo) => (
          <div key={todo.id} className="ToDo__item">
            <input
              type="checkbox"
              checked={todo.status === TodoStatus.COMPLETED}
              onChange={handleUpdateTodoStatus(todo.id)}
            />
            <span>{todo.content}</span>
            <button
              className="Todo__delete"
              onClick={handleDeleteTodo(todo.id)}
            >
              X
            </button>
          </div>
        ))}
    </div>
  );
};

export default ToDoList;
