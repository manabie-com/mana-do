import React, { useRef } from "react";

interface TodoInputProps {
  defaultValue?: string;
  onEnter?: (value: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({
  defaultValue = "",
  onEnter,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      onEnter && onEnter(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <input
      ref={inputRef}
      defaultValue={defaultValue}
      className="Todo__input"
      placeholder="What need to be done?"
      onKeyDown={handleKeyDown}
    />
  );
};

export default TodoInput;
