import React, { FunctionComponent } from "react";

interface Props {
  onCreateTodo: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  inputRef: React.RefObject<HTMLInputElement>;
}

const ToDoSearch: FunctionComponent<Props> = ({ onCreateTodo, inputRef }) => {
  return (
    <div className="Todo__creation">
      <input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={(e) => onCreateTodo(e)}
      />
    </div>
  );
};

export default ToDoSearch;
