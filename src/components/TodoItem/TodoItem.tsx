import React, { useRef, useState } from "react";
import { Todo } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import "./styles.css";
import clsx from "clsx";

interface TodoItemProps {
  todo: Todo;
  deleteItem: Function;
  updateContent: Function;
  updateStatus: Function;
}

const TodoItem = ({
  todo,
  deleteItem,
  updateContent,
  updateStatus,
}: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [contentUpd, setContentUpd] = useState(() => todo.content);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSaveEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      if (inputRef.current.value.length > 0)
        updateContent(todo.id, inputRef.current.value);
      setIsEdit(false);
    }
  };

  const onEditTodo = (e: React.FormEvent<HTMLInputElement>) => {
    setContentUpd(e.currentTarget.value);
  };

  const onBlurTodo = (e: React.FocusEvent<HTMLInputElement>) => {
    setContentUpd(todo.content);
    setIsEdit(!isEdit);
  };

  const onClickDelete = () => {
    deleteItem(todo.id);
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    updateStatus(todoId, e.target.checked);
  };

  return (
    <div
      key={todo.id}
      className={clsx("TodoItem", isTodoCompleted(todo) && "TodoItem--checked")}
    >
      <input
        className="TodoItem__checkbox"
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />

      <fieldset disabled={!isEdit} className="TodoItem__fieldset">
        <input
          className={clsx(
            "TodoItem__input",
            isTodoCompleted(todo) && "TodoItem__input--checked"
          )}
          ref={inputRef}
          type="text"
          value={contentUpd}
          onChange={onEditTodo}
          onKeyDown={onSaveEdit}
          onBlur={onBlurTodo}
          onClick={() => setIsEdit(true)}
        />
      </fieldset>

      <i className="fas fa-times TodoItem__delete" onClick={onClickDelete}></i>
    </div>
  );
};

export default TodoItem;
