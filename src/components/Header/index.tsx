import React, { useContext, useRef } from 'react';
import {
  createTodo,
} from 'store/actions';
import Service from 'service';
import { TodoContext } from 'App';
import './index.scss';

export const Header = () => {
  const { dispatch, todos } = useContext(TodoContext);
  const inputRef = useRef<any>(null);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !inputRef.current.value) {
      return;
    }
    if (todos.find(todo => todo.content === inputRef.current.value)) {
      inputRef.current.value = '';
      alert('Duplicate todo!');
      return;
    }
    const resp = await Service.createTodo(inputRef.current.value.trim());
    dispatch(createTodo(resp));
    inputRef.current.value = '';
  }

  return (
    <header className="creation">
      <input
        ref={inputRef}
        className="creation__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
      />
    </header>
  );
};
