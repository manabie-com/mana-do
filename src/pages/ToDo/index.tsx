import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Todo, TodoStatus } from 'models/todo';
import { getKey, isTodoCompleted, setKey } from 'utils';
import './styles.css';
import reducer, { AppState } from 'store/reducer';
import Service from 'service';
import {
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo,
} from 'store/actions';
type EnhanceTodoStatus = TodoStatus | TodoStatus.ALL;

const todosKey = 'todos';
const todosString = getKey<{ todos: Todo[] }>(todosKey);
const initialState: AppState = todosString
  ? (todosString as AppState) ?? { todos: [] }
  : { todos: [] };

const ToDoPage = () => {
  const [btnActive, setBtnActive] = useState<EnhanceTodoStatus>(TodoStatus.ALL);
  const todoInputRef = useRef<HTMLInputElement>(null);
  const todoEditRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState('');
  const [{ todos }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setKey<{ todos: Todo[] }>(todosKey, { todos });
  }, [todos]);

  const handleCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && todoInputRef.current) {
      const resp = await Service.createTodo(todoInputRef.current.value);
      dispatch(createTodo(resp));
      todoInputRef.current.value = '';
    }
  };

  const handleUpdateTodoStatus = (todoId: string) => {
    function handler(e: React.ChangeEvent<HTMLInputElement>) {
      dispatch(updateTodoStatus(todoId, e.target.checked));
    }
    return handler;
  };

  const handleToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const handleDeleteTodo = (todoId: string) => {
    function handler() {
      dispatch(deleteTodo(todoId));
    }
    return handler;
  };

  const handleDeleteAllTodos = () => {
    dispatch(deleteAllTodos());
  };

  const handleTodoDoubleClick = (todoId: string) => {
    function handler() {
      setEditing(todoId);
    }
    return handler;
  };

  const handleBlurOnEditing = () => {
    setEditing('');
  };

  const handleUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && todoEditRef.current) {
      dispatch(updateTodo(editing, todoEditRef.current.value));
      todoEditRef.current.value = '';
      handleBlurOnEditing();
    }
  };

  const showTodos = todos.filter((todo) => {
    switch (btnActive) {
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
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={todoInputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={handleCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {showTodos.length > 0 ? (
          showTodos.map((todo, index) => {
            return (
              <div
                key={index}
                className={`ToDo__item ${
                  todo?.status === TodoStatus.ACTIVE
                    ? 'Action__btn-active'
                    : 'Action__btn-completed'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isTodoCompleted(todo)}
                  onChange={handleUpdateTodoStatus(todo.id)}
                />
                {editing !== todo.id ? (
                  <span onDoubleClick={handleTodoDoubleClick(todo.id)}>
                    {todo.content}
                  </span>
                ) : (
                  <input
                    type="text"
                    className="ToDo__edit"
                    ref={todoEditRef}
                    autoFocus
                    onBlur={handleBlurOnEditing}
                    onKeyDown={handleUpdateTodo}
                  />
                )}
                <button
                  className="Todo__delete"
                  onClick={handleDeleteTodo(todo.id)}
                >
                  X
                </button>
              </div>
            );
          })
        ) : (
          <>No Todos</>
        )}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={handleToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button
            className={`Action__btn ${
              btnActive === TodoStatus.ALL && 'btn__active'
            }`}
            onClick={() => setBtnActive(TodoStatus.ALL)}
          >
            All
          </button>
          <button
            className={`Action__btn-active ${
              btnActive === TodoStatus.ACTIVE && 'btn__active'
            }`}
            onClick={() => setBtnActive(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`Action__btn-completed ${
              btnActive === TodoStatus.COMPLETED && 'btn__active'
            }`}
            onClick={() => setBtnActive(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Action__danger" onClick={handleDeleteAllTodos}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
