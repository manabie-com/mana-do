import React from "react";

const ToDoContainer = ({ onCreateTodo, _ref }) => {
  return (
    <div className="Todo__creation">
      <input
        ref={_ref}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
        maxLength={150}
      />
    </div>
  );
};

export default ToDoContainer;
