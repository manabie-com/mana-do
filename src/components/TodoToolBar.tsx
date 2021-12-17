import React, { useContext } from "react";
import { AppContext } from "../store/AppProvider";
import { deleteAllTodos, toggleAllTodos } from "../store/actions";
import { TodoStatus, TodoToolBarInterface } from "../models/todo";
import { isTodoCompleted } from "../utils";

const TodoToolBar = ({ todos, setShowing }: TodoToolBarInterface) => {
  const { dispatch } = useContext(AppContext);

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className="Todo__toolbar" data-testid="todo-toolbar">
      {todos.length > 0 ? (
        <input
          type="checkbox"
          checked={activeTodos === 0}
          onChange={onToggleAllTodo}
          style={{ fontSize: "1rem" }}
        />
      ) : (
        <div />
      )}
      <div className="Todo__tabs">
        <button className="Action__btn" onClick={() => setShowing("ALL")}>
          All
        </button>
        <button
          className="Action__btn"
          onClick={() => setShowing(TodoStatus.ACTIVE)}>
          Active
        </button>
        <button
          className="Action__btn"
          onClick={() => setShowing(TodoStatus.COMPLETED)}>
          Completed
        </button>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default TodoToolBar;
