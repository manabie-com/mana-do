import React, { useContext } from "react";
import { Context as TodoContext } from "../context/TodoContext";
import { TodoStatus } from "../models/todo";
import { deleteAllTodos, filterTodos, toggleAllTodos } from "../store/actions";

type EnhanceTodoStatus = TodoStatus | "ALL";

export const TodoControl: React.FC = () => {
  const {
    state: { todos, filter },
    dispatch,
  } = useContext(TodoContext);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onFilterTodoStatus = (value: EnhanceTodoStatus) => {
    dispatch(filterTodos(value));
  };

  return (
    <div className="Todo__toolbar">
      {todos?.length > 0 ? (
        <input type="checkbox" onChange={onToggleAllTodo} />
      ) : (
        <div />
      )}
      <div className="Todo__tabs">
        <button
          className={filter === "ALL" ? "active Action__btn" : "Action__btn"}
          onClick={() => onFilterTodoStatus("ALL")}
        >
          All
        </button>
        <button
          className={
            filter === TodoStatus.ACTIVE ? "active Action__btn" : "Action__btn"
          }
          onClick={() => onFilterTodoStatus(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={
            filter === TodoStatus.COMPLETED
              ? "active Action__btn"
              : "Action__btn"
          }
          onClick={() => onFilterTodoStatus(TodoStatus.COMPLETED)}
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
