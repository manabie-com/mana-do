import Button from "components/button";
import Input from "components/input";
import React from "react";
import { Todo } from "../todo.models";
import Styles from "./todo-toolbar.module.scss";

type TodoToolbarProps = {
  todos: Todo[];
  onToggleAllTodo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onShowAllTodo: () => void;
  onShowActiveTodo: () => void;
  onShowCompletedTodo: () => void;
  onDeleteAllTodo: () => void;
};

const TodoToolbar = ({
  todos,
  onToggleAllTodo,
  onShowAllTodo,
  onShowActiveTodo,
  onShowCompletedTodo,
  onDeleteAllTodo,
}: TodoToolbarProps) => {
  return (
    <div className={Styles.Container}>
      {todos.length > 0 ? <Input type="checkbox" onChange={onToggleAllTodo} /> : <div />}
      <div className={Styles.Tabs}>
        <Button onClick={onShowAllTodo}>All</Button>
        <Button onClick={onShowActiveTodo}>Active</Button>
        <Button variant="success" onClick={onShowCompletedTodo}>
          Completed
        </Button>
      </div>
      <Button variant="danger" onClick={onDeleteAllTodo}>
        Delete All
      </Button>
    </div>
  );
};

export default TodoToolbar;
