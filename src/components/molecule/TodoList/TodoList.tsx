import { Todo, TodoStatus } from "models/todo";
import React from "react";
import ToDoItem from "components/atom/TodoItem";

export type EnhanceTodoStatus = TodoStatus | "ALL";

type ToDoListProps = {
  showTodos: Todo[];
  showing: EnhanceTodoStatus;
};

export const emptyTodoMessage = (showing: EnhanceTodoStatus) =>
  `There are not${
    showing === TodoStatus.ACTIVE
      ? " active"
      : showing === TodoStatus.COMPLETED
      ? " completed"
      : ""
  } items`;

const ToDoList: React.FC<ToDoListProps> = ({ showTodos, showing }) => {
  return (
    <div className="ToDo__list">
      {showTodos.length === 0 && (
        <span className="Todo__empty__message" data-testid="empty-message">
          {emptyTodoMessage(showing)}
        </span>
      )}
      {showTodos.map((todo) => {
        return <ToDoItem todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

export default ToDoList;
