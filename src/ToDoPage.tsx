import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from './store/reducer';
import {
  setTodos,
  createTodo,
  editTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  EditAbleTodo,
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';
import { isTodoCompleted } from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);
  const [editText, setEditText] = useState<string>('');

  // used localStorage to persist todo stage
  // retrieve localstorage array and prefer dispatching setTodo with persisted list before using the default getTodos()
  useEffect(() => {
    (async () => {
      const data = localStorage.getItem('my-todo-list');
      const savedData = data;
      const resp = await Service.getTodos();
      // if there is data in localStorage then set it as current state
      if (savedData) {
        dispatch(setTodos(JSON.parse(savedData)));
      } else {
        dispatch(setTodos(resp || []));
      }
    })();
  }, []);
  // save the current todos state as string
  useEffect(() => {
    localStorage.setItem('my-todo-list', JSON.stringify(todos));
  });

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = '';
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/');
        }
      }
    }
  };
  // update content of todo task with message
  const onEditTodo = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string,
    message: string
  ) => {
    if (e.key === 'Enter' && inputRef.current) {
      dispatch(editTodo(todoId, message));
      setEditText('');
    }
  };
  // change editable to the opposite of its current value so that the respective Todo task can be edit/non-editable
  const onEditAble = (todoId: string) => {
    dispatch(EditAbleTodo(todoId));
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
    <div className="ToDo__container">
      <div className="Todo__creation">
        <div className="Todo__banner">To-do List</div>
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo, index) => {
          return (
            // using ID as key instead of index is a better practice
            //because we might need to rearrange todo in the future, thus we should not rely on index for keys as index can change
            <div key={todo.id} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              {/* render a span unless the user need to edit the Todo task, then it render an input instead */}
              {!todo.editAble ? (
                <input
                  className="Todo__task"
                  id={todo.id}
                  placeholder={todo.content}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => onEditTodo(e, todo.id, editText)}
                  onBlur={() => {
                    onEditAble(todo.id);
                  }}
                ></input>
              ) : (
                <span
                  className="Todo__task"
                  onClick={() => {
                    onEditAble(todo.id);
                  }}
                >
                  {todo.content ? todo.content : 'empty task'}
                </span>
              )}
              <button
                className="Todo__delete"
                onClick={() => dispatch(deleteTodo(todo.id))}
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
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
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
    </div>
  );
};

export default ToDoPage;
