import React, { useCallback, useEffect, useReducer, useState } from 'react';
import './styles.css';
import { setTodos, toggleAllTodos, deleteAllTodos } from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import reducer, { initialState } from '../../store/reducer';
import TodoInput from './Input';
import TodoItem from './Item';

const TodoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<TodoStatus | string>('ALL');
  const saveTodos = useCallback(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await Service.getTodos();
        dispatch(setTodos(resp));
      } catch {
        dispatch(setTodos([]));
      }
    })();
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', saveTodos);

    return () => {
      window.removeEventListener('beforeunload', saveTodos);
    };
  }, [saveTodos]);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className={'Todo__wrapper'}>
      <div className="Todo__container">
        <TodoInput dispatch={dispatch} />

        <div className="Todo__list">
          {showTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
          ))}
        </div>

        <div className="Todo__toolbar">
          {todos.length > 0 && (
            <input
              type="checkbox"
              className={'Todo__checkbox'}
              checked={activeTodos === 0}
              onChange={onToggleAllTodo}
            />
          )}

          <button
            type={'button'}
            className={`Todo__tag${showing === 'ALL' ? ' active' : ''}`}
            onClick={() => {
              setShowing('ALL');
            }}
          >
            All
          </button>

          <button
            type={'button'}
            className={`Todo__tag${
              showing === TodoStatus.ACTIVE ? ' active' : ''
            }`}
            onClick={() => {
              setShowing(TodoStatus.ACTIVE);
            }}
          >
            Active
          </button>

          <button
            type={'button'}
            className={`Todo__tag${
              showing === TodoStatus.COMPLETED ? ' active' : ''
            }`}
            onClick={() => {
              setShowing(TodoStatus.COMPLETED);
            }}
          >
            Completed
          </button>

          <button
            className="Todo__button Todo__buttonRemoveAll"
            onClick={onDeleteAllTodo}
          >
            Remove All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
