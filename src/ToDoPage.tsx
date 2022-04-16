import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  deleteTodo,
  updateTodoStatus,
} from './store/actions';
import Service from './service';
import { TodoStatus, Todo } from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    let _todos: Todo[];
    if (showing === 'ALL') {
      _todos = [...todos];
    } else {
      _todos = todos.filter((el) => el.status === showing);
    }

    setFilteredTodos(_todos);
  }, [showing, todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const content = inputRef.current?.value;
      if (content) {
        const resp = await Service.createTodo(content);
        dispatch(createTodo(resp));
      }
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="Todo__toolbar">
        {filteredTodos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button className="Action__btn" onClick={() => setShowing('ALL')}>
            All
          </button>
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
      <div className="ToDo__list">
        {filteredTodos.map((todo) => {
          return (
            <div key={todo.id} className="ToDo__item">
              <input
                type="checkbox"
                checked={TodoStatus.COMPLETED === todo.status}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToDoPage;
