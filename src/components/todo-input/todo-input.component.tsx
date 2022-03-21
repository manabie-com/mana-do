import React, { useState } from 'react';
import "./todo-input.style.css";
export interface IInputTodoProps {
  onCreateTodo: any;
}

export const TodoInput = (props: IInputTodoProps) => {
  const [value, setValue] = useState('');


  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value) {
      if (!value) return;
      props.onCreateTodo(value);
      
      // clear input
      setValue('');
    }
  };
  return (
    <div className="ToDo__input_container">
      <input
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        className="ToDo__input"
        placeholder="What needs to be done?"
        onKeyDown={onCreateTodo}
      />
    </div>
  )
}


