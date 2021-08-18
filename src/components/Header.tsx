import React from "react";
import "./Header.css";

type Props = {
  onCreateTodo: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  inputRef: React.RefObject<HTMLInputElement>;
};

const Header: React.FC<Props> = ({ inputRef, onCreateTodo }) => {
  //change to onKeyUp
  return (
    <div className="Todo__creation">
      <input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyUp={onCreateTodo}
      />
    </div>
  );
};

export default Header;
