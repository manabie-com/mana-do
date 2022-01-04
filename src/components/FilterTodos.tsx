import * as React from "react";
import { EnhanceTodoStatus, Todo, TodoStatus } from "../models/todo";
import { AppActions, deleteAllTodos, toggleAllTodos } from "../store/actions";
import { isTodoCompleted } from "../utils";
import cl from "classnames";

interface FilterTodosProps extends React.HTMLAttributes<HTMLDivElement> {
  dispatch: React.Dispatch<AppActions>;
  todos: Array<Todo>;
  setShowing: (status: EnhanceTodoStatus) => void;
  showing: EnhanceTodoStatus;
}

export const FilterTodos = (props: FilterTodosProps) => {
  const { todos, dispatch, setShowing, showing } = props;

  const activeTodos = todos.reduce(function (accum: number, todo: Todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className="Todo__toolbar">
      {todos.length > 0 ? (
        <input
          type="checkbox"
          checked={activeTodos === 0}
          onChange={onToggleAllTodo}
        />
      ) : (
        <div />
      )}
      <div className="Todo__tabs">
        <button
          className={cl("Action__btn", { active: showing === 'ALL' })}
          onClick={() => setShowing("ALL")}
        >
          All
        </button>
        <button
          className={cl("Action__btn", {
            active: showing === TodoStatus.ACTIVE,
          })}
          onClick={() => setShowing(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={cl("Action__btn", {
            active: showing === TodoStatus.COMPLETED,
          })}
          onClick={() => setShowing(TodoStatus.COMPLETED)}
        >
          Completed
        </button>
      </div>
      <button className="Action__btn" onClick={onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  );
};
