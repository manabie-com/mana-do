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
  return (
    <div className={styles.container}>
      <div>{`${unCompleteNumber} items lefts`}</div>
      <div className={styles.actions}>
        <button
          className={filter === TodoStatus.ALL ? styles.selected : ""}
          onClick={() => changeFilter(TodoStatus.ALL)}
        >
          All
        </button>
        <button
          className={filter === TodoStatus.ACTIVE ? styles.selected : ""}
          onClick={() => changeFilter(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={filter === TodoStatus.COMPLETED ? styles.selected : ""}
          onClick={() => changeFilter(TodoStatus.COMPLETED)}
        >
          Completed
        </button>
      </div>
      <button className={styles.clearButton} onClick={clearTodos}>
        Clear all todos
      </button>
    </div>
  );
}
