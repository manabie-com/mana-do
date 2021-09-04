import React, { FunctionComponent } from "react";
import { Todo } from "../../models/todo";
import Button from "../common/button";
import Checkbox from "../common/inputs/checkbox";

interface Props {
  activeTodos: number;
  todos: Todo[];
  onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteAllTodo: () => void;
}

const ToDoToolbar: FunctionComponent<Props> = ({
  activeTodos,
  todos,
  onToggleAllTodo,
  onDeleteAllTodo,
}) => {
  return (
    <div className="Todo__toolbar">
      <div className="ToDo_selectAll">
        <Checkbox
          checked={activeTodos === 0 && todos.length > 0}
          onChange={onToggleAllTodo}
          disabled={todos.length === 0}
        />
        <div className="label">Check complete all</div>
      </div>
      <Button
        className="Action__btn"
        label="Clear all todos"
        onClick={onDeleteAllTodo}
      />
    </div>
  );
};

export default ToDoToolbar;
