import React, { useState } from "react";

import styles from "./TodoInput.module.scss";

const defaultValue = "";

export default function TodoInput({ addTodo }: any): JSX.Element {
  const [value, setValue] = useState(defaultValue);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && Boolean(value)) {
      console.log("dispatch: ", value);
      setValue(defaultValue);
      addTodo(value);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        aria-label="input"
        className={styles.input}
        placeholder="What need to be done?"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
