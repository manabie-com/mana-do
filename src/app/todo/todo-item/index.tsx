import Button from "components/button";
import Input from "components/input";
import React, { ComponentPropsWithoutRef } from "react";
import { EnhancedTodoStatus, Todo } from "../todo.models";
import Styles from "./todo-item.module.scss";

type TodoItemProps = {
  todo: Todo;
  showing: EnhancedTodoStatus;
  onUpdateTodoStatus: (event: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
} & ComponentPropsWithoutRef<"div">;

const TodoItem = ({ todo, showing, onUpdateTodoStatus, ...props }: TodoItemProps) => {
  return (
    <div className={Styles.Container} {...props}>
      <Input
        type="checkbox"
        checked={showing === todo.status}
        onChange={(event) => onUpdateTodoStatus(event, todo.id)}
      />
      <span>{todo.content}</span>
      <Button>X</Button>
    </div>
  );
};

export default TodoItem;
