import React, { useEffect, useRef, useState } from 'react';

import {
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  getTodos,
} from '../store/actions';
import { Todo, TodoStatus } from '../models/todo';
import useStore from '../store';
import TodoItem from '../common/TodoItem';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [content, setContent] = useState('');
  const [{ todos }, dispatch] = useStore();
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(createTodo(content));
      setContent('');
    }
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className='ToDo__container'>
      <div className='Todo__creation'>
        <input
          ref={inputRef}
          className='Todo__input'
          placeholder='What need to be done?'
          value={content}
          onChange={onInputChange}
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className='ToDo__list'>
        {todos.map((todo: Todo, index: number) => (
          <TodoItem key={todo.id + index} todo={todo} dispatch={dispatch} />
        ))}
      </div>
      <div className='Todo__toolbar'>
        {todos.length > 0 ? (
          <input type='checkbox' onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className='Todo__tabs'>
          <button className='Action__btn'>All</button>
          <button
            className='Action__btn'
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className='Action__btn'
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className='Action__btn' onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
