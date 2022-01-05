import React from "react";
import { Todo } from "models/todo";
import { isTodoCompleted } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface TodoItemProps {
  todo: Todo;
  onUpdateStatus: (todoId: string, checked: boolean) => void;
  onDelete: (todoId: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdateStatus,
  onDelete,
}) => {
  function handleUpdateStatus(
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) {
    onUpdateStatus(todoId, e.target.checked);
  }

  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => handleUpdateStatus(e, todo.id)}
      />
      <span>{todo.content}</span>
      <button className="Todo__delete" onClick={() => onDelete(todo.id)}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default TodoItem;
