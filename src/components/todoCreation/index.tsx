import React from "react";
import "./todoCreation.css";

interface ITodoCreation {
  inputRef: React.RefObject<HTMLInputElement>;
  onCreateTodo: React.KeyboardEventHandler;
  error: string;
}

const TodoCreation: React.FC<ITodoCreation> = ({
  inputRef,
  onCreateTodo,
  error,
}) => {
  return (
    <div className="todo__creation">
      {error && (
        <h4 className="todo__error" data-testid="todoCreationError">
          {error}
        </h4>
      )}
      <input
        ref={inputRef}
        className="todo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
        data-testid="todoCreation"
      />
    </div>
  );
};

export default TodoCreation;
