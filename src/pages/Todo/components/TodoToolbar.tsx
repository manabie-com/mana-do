import * as React from "react";
import { Button } from "../../../components";

interface ITodoToolBarProps {}

const TodoToolBar: React.FunctionComponent<any> = ({
  todos,
  activeTodos,
  onToggleAllTodo,
  onDeleteAllTodo,
}) => {
  return (
    <div className="ToDo__toolbar">
      {todos.length > 0 ? (
        <label htmlFor="selectall" className="ToDo__selectall">
          <input
            name="selectall"
            id="selectall"
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
          <span>Complete all todos</span>
        </label>
      ) : null}

      <Button
        classNames="btn btn__danger"
        onClick={onDeleteAllTodo}
        text="Clear all todos"
      />
    </div>
  );
};

export default TodoToolBar;
