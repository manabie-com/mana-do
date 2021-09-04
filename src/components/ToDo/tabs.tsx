import React, { FunctionComponent } from "react";
import { Todo, TodoStatus } from "../../models/todo";

type EnhanceTodoStatus = TodoStatus | "ALL";

interface Props {
  todos: Todo[];
  setShowing: React.Dispatch<React.SetStateAction<EnhanceTodoStatus>>;
}

const TodoTabs: FunctionComponent<Props> = ({ setShowing, todos }) => {
  return (
    <div className="Todo__tabs">
      Show &nbsp;
      <input
        type="radio"
        id="all"
        name="show_type"
        value="ALL"
        defaultChecked
        onClick={() => setShowing("ALL")}
      />
        <label htmlFor="all">All ({todos.length})</label>
      <br />
      <input
        type="radio"
        id="Active"
        name="show_type"
        value="Active"
        onClick={() => setShowing(TodoStatus.ACTIVE)}
      />
      <label htmlFor="Active">
        Active (
        {todos.length
          ? todos.filter((x) => x.status === TodoStatus.ACTIVE).length
          : 0}
        )
      </label>
      <br />
      <input
        type="radio"
        id="Completed"
        name="show_type"
        value="Completed"
        onClick={() => setShowing(TodoStatus.COMPLETED)}
      />
      <label htmlFor="Completed">
        Completed (
        {todos.length
          ? todos.filter((x) => x.status === TodoStatus.COMPLETED).length
          : 0}
        )
      </label>
    </div>
  );
};

export default TodoTabs;
