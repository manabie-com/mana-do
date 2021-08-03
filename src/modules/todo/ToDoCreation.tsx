import React, { useRef } from 'react';
import { createTodo } from './store/actions';
import { useTodoContext } from './ToDoContext';

const ToDoCreation = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useTodoContext();

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current && inputRef.current.value !== '') {
      dispatch(createTodo(inputRef.current.value));
      inputRef.current.value = '';
    }
  }

  return (
    <div className="Todo__creation">
      <input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
      />
    </div>
  );
};

export default ToDoCreation;
