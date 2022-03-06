import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import { TodoStatus } from './models/todo';
import {
  getTodos,
  createTodo,
  updateTodoStatus,
  deleteTodo,
} from './store/actions';
import reducer, { initialState } from './store/reducer';
import Service from './service';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      // get initial todo list from localStorage
      const response = await Service.getTodos();
      dispatch(getTodos(response));
    })()
  }, []);

  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      Service.createTodo(inputRef.current.value)
        .then((response) => dispatch(createTodo(response)))
        .catch((error) => alert(error));
    }
  }

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    Service.setTodo(todoId, status)
      .then((response) => dispatch(updateTodoStatus(todoId, response)))
      .catch((error) => alert(error));
  }

  const onDeleteTodo = (todoId: string) => {
    Service.setTodo(todoId, TodoStatus.DELETED)
      .then((response) => dispatch(deleteTodo(todoId)))
      .catch((error) => alert(error));
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    todos.forEach((todo) => {
      onUpdateTodoStatus(e, todo.id);
    });
  }

  const onDeleteAllTodo = () => {
    todos.forEach((todo) => {
      onDeleteTodo(todo.id);
    });
  }

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What needs to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>

      <div className="ToDo__list">
        {todos.map((todo, index) => {
          // bug: filter not working
          // fix: added condition to display appropriate status
          return (showing === 'ALL' || showing === todo.status) && (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                // bug: checked is set to true if TodoStatus is ACTIVE
                // fix: changed status lookup to COMPLETED
                checked={todo.status === TodoStatus.COMPLETED}
                // bug: index is provided instead of id
                // fix: changed to id
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

      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}

        <div className="Todo__tabs">
          <button
            // added condition to display ALL items
            className={showing === 'ALL' ? 'Action__btn' : ''}
            onClick={() => setShowing('ALL')}
          >
            All
          </button>

          <button
            // added condition to display ACTIVE items
            className={showing === TodoStatus.ACTIVE ? 'Action__btn' : ''}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>

          <button
            // added condition to display COMPLETED items
            className={showing === TodoStatus.COMPLETED ? 'Action__btn' : ''}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>

        <button onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;