import Input from "components/input";
import React, { ComponentPropsWithRef } from "react";

import Styles from "./todo-create.module.scss";

type TodoInputProps = {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
} & ComponentPropsWithRef<"input">;

const TodoCreate = ({ onKeyDown, ref }: TodoInputProps) => {
  return (
    <div className={Styles.Container}>
      <Input placeholder="What need to be done?" onKeyDown={onKeyDown} ref={ref} />
    </div>
  );
};

export default TodoCreate;
