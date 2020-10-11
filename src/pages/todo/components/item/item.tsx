import React, { useState } from "react";
import Button from "src/components/button";
import Input from "src/components/input";
import "./todo.scss";

export type TodoItemProps = {
  id: string;
  content: string;
  checked: boolean;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, checked: boolean) => void;
  className?: string;
  disabled?: boolean;
};

export const deleteTodo = (
  onDelete: (id: string) => void,
  id: string
) => () => {
  onDelete?.(id);
};

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  content,
  checked,
  onUpdate,
  onDelete,
  onUpdateStatus,
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onChangeStatus = (evt: any) => {
    onUpdateStatus(id, evt.target.checked);
  };
  const handleDelete = deleteTodo(onDelete, id);
  const toggleEditing = () => setIsEditing(!isEditing);

  const handleUpdate = (evt: any) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);
    const content = formData.get("content") as string;
    onUpdate(id, content);
    toggleEditing();
  };

  return (
    <div
      className={`todo-item ${className}`}
      title="Double click to edit!"
      onDoubleClick={toggleEditing}
    >
      {isEditing ? (
        <form className="form" onSubmit={handleUpdate}>
          <Input
            placeholder="What need to be done?"
            name="content"
            defaultValue={content}
          />
          <Input hidden type="submit" />
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            className="checkbox inline-block"
            onChange={onChangeStatus}
            checked={checked}
          />
          <span>{content}</span>
          <Button variant="danger" onClick={handleDelete}>
            x
          </Button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
