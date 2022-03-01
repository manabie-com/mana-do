import React, { useRef, useContext } from "react";
import { Context as TodoContext } from "../context/TodoContext";
import Service from "../service";
import { createTodo } from "../store/actions";

const AddTodo: React.FC = () => {
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef<any>(null);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  return (
    <div className="Todo__creation">
      <input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
      />
    </div>
  );
};

export default AddTodo;
