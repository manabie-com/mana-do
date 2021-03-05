import React, { useRef } from "react";
import { fullDate } from "../../utils/getTime";

const TodoCreation = ({ createTodo }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      inputRef.current &&
      inputRef.current.value.length > 0 // not create toto with content empty
    ) {
      createTodo(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="ToDo__creation">
      <input
        ref={inputRef}
        className="ToDo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
      />
      <label htmlFor="date_todo">{fullDate()}</label>
    </div>
  );
};

export default TodoCreation;
