import React from "react";
import { TodoItem } from "../../models/todo";

const ToDoItem = ({
  isShowing,
  todo,
  onUpdateTodoStatus,
  onDeleteTodo,
}: TodoItem) => {
  const isTodoItemCheked = isShowing === todo.status;

  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={isTodoItemCheked}
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
