import React from "react";
import {Todo, TodoStatus} from '../models/todo';
import {isTodoCompleted} from '../utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';

interface TodoToolbarProps {
  todos: Array<Todo>;
  toggleAllTodo: (completed: boolean) => void;
  filter: EnhanceTodoStatus;
  filterChange: (filter: EnhanceTodoStatus) => void;
  deleteAllTodo: () => void;
}

const TodoToolbar: React.FC<TodoToolbarProps> = ({
  todos,
  toggleAllTodo,
  filter,
  filterChange,
  deleteAllTodo,
}) => {
  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="Todo__card Todo__toolbar">
      <div className="Todo__corner">
        {todos.length > 0 && (
          <div className="Todo__cb_container">
            <input
              className="Todo__checkbox"
              type="checkbox"
              checked={activeTodos === 0}
              onChange={e => toggleAllTodo(e.target.checked)}
            />
            <span className="Todo__check" />
          </div>
        )}
      </div>
      <div className="Todo__tabs">
        <button
          className={`Action__btn ${filter === "ALL" ? "active" : ""}`}
          onClick={() => filterChange("ALL")}
        >
          All
        </button>
        <button
          className={`Action__btn ${
            filter === TodoStatus.ACTIVE ? "active" : ""
          }`}
          onClick={() => filterChange(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={`Action__btn ${
            filter === TodoStatus.COMPLETED ? "active" : ""
          }`}
          onClick={() => filterChange(TodoStatus.COMPLETED)}
        >
          Completed
        </button>
      </div>
      <div className="Todo__corner">
        <button
          className="Action__btn"
          onClick={deleteAllTodo}
        >
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default TodoToolbar;
