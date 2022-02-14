import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { TodoStatus } from './models/todo';
import Service from './service';
import {
  createTodo,
  deleteAllTodos,
  setTodos,
  toggleAllTodos,
  updateTodoStatus,
} from './store/actions';
import reducer, { initialState } from './store/reducer';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage: React.FC = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const resp = await Service.createTodo(e.currentTarget.value);
        dispatch(createTodo(resp));
      }
    },
    []
  );

  const onUpdateTodoStatus = useCallback(
    (todoId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateTodoStatus(todoId, e.target.checked));
    },
    []
  );

  const onToggleAllTodo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(toggleAllTodos(e.target.checked));
    },
    []
  );

  const onDeleteAllTodo = useCallback(() => {
    dispatch(deleteAllTodos());
  }, []);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {todos.map((todo) => (
          <div key={todo.id} className="ToDo__item">
            <input
              type="checkbox"
              checked={showing === todo.status}
              onChange={onUpdateTodoStatus(todo.id)}
            />
            <span>{todo.content}</span>
            <button className="Todo__delete">X</button>
          </div>
        ))}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button className="Action__btn">All</button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
