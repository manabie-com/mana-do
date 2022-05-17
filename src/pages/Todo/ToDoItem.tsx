import React from "react";
import { TodoItem, TodoStatus } from "../../models/todo";

const ToDoItem = ({ todo, onUpdateTodoStatus, onDeleteTodo }: TodoItem) => {
  const checkStatusCompleted = TodoStatus.COMPLETED === todo.status;

  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={checkStatusCompleted}
        onChange={onUpdateTodoStatus}
      />
      <span>{todo.content}</span>
      <button type="button" className="Todo__delete" onClick={onDeleteTodo}>
        X
      </button>
    </div>
  );
};

export default ToDoItem;
