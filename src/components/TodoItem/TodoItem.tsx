import React from "react";
import { Todo } from "types";
import { Actions } from "store/reducer";

import styles from "./TodoItem.module.scss";

type PropTypes = Todo & {
  dispatch: React.Dispatch<Actions>;
};

export default function TodoItem({
  id,
  content,
  isCompleted,
  dispatch,
}: PropTypes): JSX.Element {
  const labelClass = `${isCompleted ? styles.completed : ""}`;

  const onToggle = () => {
    dispatch({
      type: "UPDATE_TODO",
      payload: { id, content, completed: !isCompleted },
    });
  };

  const onDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  return (
    <div className={styles.item} aria-label="item">
      <label className={labelClass}>
        <input
          className="toggle"
          type="checkbox"
          checked={isCompleted}
          onChange={onToggle}
        />
        {content}
      </label>
      <button onClick={onDelete} className={styles.deleteButton}></button>
    </div>
  );
}
