import React, { useRef } from "react";
type Props = {
  onCreateTodo: Function;
};
const Input = ({ onCreateTodo }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="Todo__creation">
      <input
        ref={inputRef}
        key={Math.random().toString()}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={(e)=> onCreateTodo(e, inputRef)}
      />
    </div>
  );
};

export default Input;
