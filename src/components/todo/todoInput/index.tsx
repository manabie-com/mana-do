import React from "react";
import { ITodoProps } from "./ITodoProps";
import "./todoInput.scss";

const TodoInput = (props: ITodoProps): JSX.Element => {
  return (
    <div className="todo-input">
      <input {...props} className="todo-input__input" />
    </div>
  );
};

export default TodoInput;
