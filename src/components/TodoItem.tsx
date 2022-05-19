import React, { useCallback } from "react";
import { Todo, TodoStatus } from "../models/todo";

interface ITodoItem {
  data: Todo;
  onChange: (todo: Todo) => void;
  onDelete: (todoId: string) => void;
}
const TodoItem = ({ data, onChange, onDelete }: ITodoItem) => {
  const { id, content, status } = data;
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...data,
        status: event.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
      });
    },
    []
  );

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id]);

  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={status === TodoStatus.COMPLETED}
        onChange={handleChange}
      />
      <span>{content}</span>
      <button className="Todo__delete" onClick={handleDelete}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
