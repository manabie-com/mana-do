import React, { useState } from "react";
import { Todo } from "models/todo";
import { isTodoCompleted } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import TodoEdit from "components/TodoEdit";

export interface TodoItemProps {
  todo: Todo;
  onUpdateStatus: (todoId: string, checked: boolean) => void;
  onUpdate: (todo: Todo) => void;
  onDelete: (todoId: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdateStatus,
  onDelete,
  onUpdate,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  function handleUpdateStatus(
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) {
    onUpdateStatus(todoId, e.target.checked);
  }

  function handleSubmit(value: string) {
    if (value) {
      onUpdate({
        ...todo,
        content: value,
      });
    }
    closeEdit();
  }

  function closeEdit() {
    setIsEdit(false);
  }

  if (isEdit) {
    return (
      <div data-testid="todo-form" className="Todo__form">
        <TodoEdit
          value={todo.content}
          onSubmit={handleSubmit}
          onCloseEdit={() => closeEdit()}
        />
      </div>
    );
  }

  return (
    <div
      data-testid="todo-item"
      onDoubleClick={() => setIsEdit(true)}
      className="ToDo__item"
    >
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => handleUpdateStatus(e, todo.id)}
      />
      <span>{todo.content}</span>
      <button
        data-testid="btn-delete"
        className="Todo__delete"
        onClick={() => onDelete(todo.id)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default TodoItem;
