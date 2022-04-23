import React from "react";
import { Todo } from "types";

import styles from "./TodoItem.module.scss";

export default function TodoItem({
  id,
  content,
  isCompleted,
}: Todo): JSX.Element {
  const labelClass = `${isCompleted ? styles.completed : ""}`;

  const deleteItem = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log("Delete item", id);
  };

  const onCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    return;
  };

  return (
    <div className={styles.item} aria-label="item">
      <label className={labelClass}>
        <input
          className="toggle"
          type="checkbox"
          checked={isCompleted}
          onChange={onCompleted}
        />
        {content}
      </label>
      <button onClick={deleteItem} className={styles.deleteButton}></button>
    </div>
  );
}
