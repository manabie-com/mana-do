import * as React from "react";
import { useState } from "react";
import { TodoComponentProps } from "../../models/todo";
import Service from "../../service";
import { createTodo } from "../../store/actions";
import "./TodoCreation.scss";

const TodoCreation = ({ dispatch }: TodoComponentProps) => {
  const [value, setValue] = useState("");

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(value);
      dispatch(createTodo(resp));
      setValue("");
    }
  };

  return (
    <div className="Todo__creation">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="Todo__creation_input"
        placeholder="Please enter your to do list"
        onKeyDown={onCreateTodo}
      />
    </div>
  );
};

export default TodoCreation;
