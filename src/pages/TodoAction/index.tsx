import "./todo-action.css";

import Todo from "../../models/todo";
import React from "react";
import { TodoStatus, TodoStatuses } from "../../constants/todo";
import { sumTodoActive } from "../../selectors/todo";
import classnames from "classnames";

interface TodoActionInterface {
  todoList?: Array<Todo>;
  onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStatusFilter: (status: TodoStatus) => void;
  onDeleteAllTodo: () => void;
  statusActive: TodoStatus;
}

const TodoAction = (props: TodoActionInterface) => {
  const {
    todoList,
    onToggleAllTodo,
    setStatusFilter,
    onDeleteAllTodo,
    statusActive,
  } = props;

  return (
    <div className="toolbar">
      {todoList && todoList.length > 0 && (
        <input
          type="checkbox"
          checked={sumTodoActive(todoList) === 0}
          onChange={onToggleAllTodo}
        />
      )}
      <div className="toolbar__tabs">
        {TodoStatuses.map((status) => (
          <button
            key={status}
            className={classnames("toolbar__tabs-btn", {
              "toolbar__tabs--active": status === statusActive,
            })}
            data-test={status}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <button className="toolbar__tabs-btn" onClick={onDeleteAllTodo}>
        Clear all todo
      </button>
    </div>
  );
};

export default TodoAction;
