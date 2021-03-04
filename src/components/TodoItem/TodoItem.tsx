import React, { useRef, useState } from "react";
import "./styles.css";

interface TodoItemProps {
  id: string;
  content: string;
  deleteItem: Function;
  updateItem: Function;
}

const TodoItem = ({ id, content, deleteItem, updateItem }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [contentUpd, setContentUpd] = useState(() => content);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSaveEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      if (inputRef.current.value.length > 0)
        updateItem(id, inputRef.current.value);
      setIsEdit(false);
    }
  };

  const onEditTodo = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setContentUpd(e.currentTarget.value);
  };

  const onBlurTodo = (e: React.FocusEvent<HTMLInputElement>) => {
    setContentUpd(content);
    setIsEdit(!isEdit);
    console.log("blur");
  };

  // const onClickEdit = () => {
  //   setIsEdit(!isEdit);
  //   if (inputRef.current) inputRef.current.focus();
  // };

  const onClickDelete = () => {
    deleteItem(id);
  };

  const onDBClick = () => {
    setIsEdit(true);
    console.log("db");
  };

  return (
    <div>
      <fieldset disabled={!isEdit}>
        <input
          ref={inputRef}
          type="text"
          value={contentUpd}
          onChange={onEditTodo}
          onKeyDown={onSaveEdit}
          onBlur={onBlurTodo}
          onClick={onDBClick}
        />
      </fieldset>

      {/* <button className="Todo__delete" onClick={onClickEdit}>
        edit
      </button> */}
      <button className="Todo__delete" onClick={onClickDelete}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
