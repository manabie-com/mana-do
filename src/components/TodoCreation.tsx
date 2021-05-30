import React from "react";

interface TodoCreationProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function TodoCreation({
  inputRef,
  onKeyDown,
}: TodoCreationProps) {
  return (
    <div className="todo__creation">
      <input
        ref={inputRef}
        className="todo__creation__input"
        placeholder="What need to be done?"
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
