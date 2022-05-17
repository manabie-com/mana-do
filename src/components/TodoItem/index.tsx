import * as React from "react";
import { Todo, TodoStatus } from "../../models/todo";

export interface ITodoItemProps {
  todo: Todo;
  index: number;
  handleUpdate: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleDelete: (id: string) => void;
}

export function TodoItem(props: ITodoItemProps) {
  const { todo, index, handleUpdate, handleDelete } = props;
  return (
    <div key={index} className="ToDo__item">
      <input
        type="checkbox"
        checked={todo.status === TodoStatus.COMPLETED ? true : false}
        onChange={(e) => handleUpdate(e, todo.id)}
      />
      <span>{todo.content}</span>
      <button onClick={() => handleDelete(todo.id)} className="Todo__delete">
        X
      </button>
    </div>
  );
}
