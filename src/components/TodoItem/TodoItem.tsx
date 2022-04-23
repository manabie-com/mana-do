import React, {
  useEffect,
  useState,
  ChangeEvent,
  MouseEvent,
  useRef,
} from "react";
import { Todo } from "types";
import { Actions } from "store/reducer";
import { useOnClickOutside } from "hooks";

import styles from "./TodoItem.module.scss";

type PropTypes = Todo & {
  dispatch: React.Dispatch<Actions>;
};

export default function TodoItem({
  id,
  content,
  completed,
  dispatch,
}: PropTypes): JSX.Element {
  const [editMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const labelClass = `${completed ? styles.completed : ""}`;

  const ref = useRef<any>();
  useOnClickOutside(ref, () => {
    setEditMode(false);
    setNewContent(content);
  });

  const onToggle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: { id, completed: event.target.checked },
    });
  };

  const onDelete = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const onUpdateContent = (event: ChangeEvent<HTMLInputElement>) => {
    setNewContent(event.target.value);
  };

  const onEdit = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setEditMode(true);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && Boolean(newContent)) {
      dispatch({
        type: "UPDATE_TODO",
        payload: {
          id,
          content: newContent,
        },
      });
      setEditMode(false);
    }
  };

  useEffect(() => {
    setNewContent(content);
  }, [content]);

  return (
    <div
      className={styles.item}
      aria-label="item"
      onDoubleClick={onEdit}
      ref={ref}
    >
      {!editMode && (
        <>
          <label className={labelClass}>
            <input
              className="toggle"
              type="checkbox"
              checked={completed || false}
              onChange={onToggle}
            />
            {content}
          </label>
          <button onClick={onDelete} className={styles.deleteButton}></button>
        </>
      )}
      {editMode && (
        <input
          className={styles.editInput}
          type="text"
          value={newContent}
          onChange={onUpdateContent}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
}
