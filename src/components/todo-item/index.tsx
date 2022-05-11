import React, { FunctionComponent } from "react";
import { Todo, TodoStatus } from "../../models/todo";

interface TodoItemProps {
  todo: Todo,
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}
const TodoItem: FunctionComponent<TodoItemProps> = ({ todo, onUpdateTodoStatus }) => {
  return(
    <div key={todo.id} className="ToDo__item">
    <input
        type="checkbox"
        checked={todo.status === TodoStatus.COMPLETED}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
    />
    <span>{todo.content}</span>
    <button
        className="Todo__delete"
    >
        X
    </button>
</div>
  );
}

export default TodoItem