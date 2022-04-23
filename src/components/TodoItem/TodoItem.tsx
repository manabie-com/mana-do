import React from "react";
import { Todo } from "types";

import styles from "./TodoItem.module.scss";

export default function TodoItem({ content, isCompleted }: Todo): JSX.Element {
  const labelClass = `${isCompleted ? styles.completed : ""}`;

  return (
    <div className={styles.item} aria-label="item">
      <label className={labelClass}>
        <input
          className="toggle"
          type="checkbox"
          //   onChange={(e) => onUpdateTodoStatus(e, index)}
        />
        {content}
      </label>
      <button className="deleteButton">X</button>
    </div>
  );
}
