import React from "react";

interface IAddTodo {
  inputRef: any;
  onCreateTodo: any;
}

const AddTodo = ({ inputRef, onCreateTodo }: IAddTodo) => {
  return (
    <div className="input_add_todo">
      <input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
      />
    </div>
  );
};

export default AddTodo;
