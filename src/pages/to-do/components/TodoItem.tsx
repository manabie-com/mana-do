import React from "react";
import { Todo } from "../../../models/todo";
import InlineEditable from "./InlineEditable";
import "./TodoItem.css";

interface TodoItemProps {
  todo: Todo;
  onUpdateStatus: any;
  onEdit: any;
  onDelete: any;
  isCompleted: boolean;
}

const TodoItem = ({
  isCompleted,
  todo,
  onUpdateStatus,
  onEdit,
  onDelete,
}: TodoItemProps) => {
  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => onUpdateStatus(e, todo.id)}
      />
      <InlineEditable
        content={todo.content}
        onSave={(value: string) => onEdit(todo.id, value)}
      >
        <input />
      </InlineEditable>
      <button className="Todo__delete" onClick={() => onDelete(todo.id)}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
