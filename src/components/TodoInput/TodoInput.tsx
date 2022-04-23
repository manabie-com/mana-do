import React from "react";

export default function TodoInput(): JSX.Element {
  return (
    <div className="Todo__creation">
      <input
        className="Todo__input"
        placeholder="What need to be done?"
        // onKeyDown={onCreateTodo}
      />
    </div>
  );
}
