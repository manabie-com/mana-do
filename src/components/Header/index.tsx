import React, { useEffect, useContext, useRef } from 'react';
import {
  setTodos,
  createTodo,
} from 'store/actions';
import Service from 'service';
import { TodoContext } from 'components/ToDoPage';
import './index.scss';

export const Header = () => {
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })()
  }, [dispatch])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
    }
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
