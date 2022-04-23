import React from "react";

import { TodoStatus } from "types";

import styles from "./TodoFilter.module.scss";

type PropTypes = {
  filter: string;
  unCompleteNumber: number;
  changeFilter: (filter: TodoStatus) => void;
  clearTodos: () => void;
};

export default function TodoFilter({
  filter,
  unCompleteNumber,
  changeFilter,
  clearTodos,
}: PropTypes): JSX.Element {
  const countText = `${unCompleteNumber} item${
    unCompleteNumber > 1 ? "s" : ""
  } left`;

  return (
    <div className={styles.container}>
      <div data-cy="todo-count">{countText}</div>
      <div className={styles.actions}>
        <button
          className={filter === TodoStatus.ALL ? styles.selected : ""}
          onClick={() => changeFilter(TodoStatus.ALL)}
          data-cy="all"
        >
          All
        </button>
        <button
          className={filter === TodoStatus.ACTIVE ? styles.selected : ""}
          onClick={() => changeFilter(TodoStatus.ACTIVE)}
          data-cy="active"
        >
          Active
        </button>
        <button
          className={filter === TodoStatus.COMPLETED ? styles.selected : ""}
          onClick={() => changeFilter(TodoStatus.COMPLETED)}
          data-cy="completed"
        >
          Completed
        </button>
      </div>
      <button
        data-cy="clear-all"
        className={styles.clearButton}
        onClick={clearTodos}
      >
        Clear all todos
      </button>
    </div>
  );
}
