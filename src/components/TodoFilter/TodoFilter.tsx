import React from "react";

import styles from "./TodoFilter.module.scss";

export default function TodoFilter({ todos = [] }): JSX.Element {
  return (
    <div className={styles.container}>
      <div>2 items lefts</div>
      <div className={styles.actions}>
        <button className={styles.selected}>All</button>
        <button
        //   onClick={() => setShowing(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
        //   onClick={() => setShowing(TodoStatus.COMPLETED)}
        >
          Completed
        </button>
      </div>
      <button
        //   onClick={onDeleteAllTodo}
        className={styles.clearButton}
      >
        Clear all todos
      </button>
    </div>
  );
}
