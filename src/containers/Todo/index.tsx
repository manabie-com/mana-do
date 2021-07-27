import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';

import reducer, { initialState } from '../../store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from '../../store/actions';
import Service from '../../service';
import { Todo, TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './style.scss';
type EnhanceTodoStatus = TodoStatus | 'ALL';

const prefix = 'todo';
const ToDoContainer = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);
  //function
  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        if (inputRef.current.value !== '') {
          const resp = await Service.createTodo(inputRef.current.value);
          dispatch(createTodo(resp));
          inputRef.current.value = '';
        }
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/');
        }
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

  const signOut = () => {
    localStorage.removeItem('token');
    history.push('/');
  };
  //constant
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
  const onActiveHandle = (value: any) => {
    if (value === showing) {
      return true;
    } else return false;
  };
  //render component
  function renderTabs() {
    return (
      <>
        <Button
          className={`action__btn`}
          active={onActiveHandle('ALL')}
          onClick={() => setShowing('ALL')}
        >
          All ToDo
        </Button>
        <Button
          className={`action__btn`}
          onClick={() => setShowing(TodoStatus.ACTIVE)}
          colorType="primary"
          active={onActiveHandle(TodoStatus.ACTIVE)}
        >
          Active
        </Button>
        <Button
          className={`action__btn `}
          active={onActiveHandle(TodoStatus.COMPLETED)}
          onClick={() => setShowing(TodoStatus.COMPLETED)}
          colorType="success"
        >
          Completed
        </Button>
      </>
    );
  }
  //use Effect
  useEffect(() => {
    if (!!localStorage.getItem('todos')) {
      let data = localStorage.getItem('todos');
      dispatch(setTodos(JSON.parse(data || '[]') as Todo[] || []));
    } else {
      (async () => {
        const resp = await Service.getTodos();
        dispatch(setTodos(resp || []));
      })();
    }
  }, []);
  useEffect(() => {
      (async () => localStorage.setItem('todos', JSON.stringify(todos)))();
  }, [showTodos, todos]);
  return (
    <div className={`${prefix}__container`}>
      <div className="header">
        <h1>Todo App</h1>
        <Button type="button" colorType="danger" size="large" onClick={signOut} className="sign-out">
          Sign Out
        </Button>
      </div>
      <div className={`${prefix}__creation`}>
        <input
          ref={inputRef}
          className={`${prefix}__input`}
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
        <div className={`${prefix}__tabs`}>{renderTabs()}</div>
      </div>
      <div className="todo__toolbar">
        {todos.length > 0 ? (
          <Input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <Button className="action__btn" onClick={onDeleteAllTodo} size="large">
          Clear all todos
        </Button>
      </div>
      <div className={`${prefix}__list`}>
        {showTodos.map((todo, index) => {
          return (
            <div
              key={index}
              className={`item item--${
                todo.status === 'ACTIVE' ? 'active' : 'completed'
              }`}
            >
              <Input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e: any) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <Button
                className="delete"
                onClick={() => {
                  dispatch(deleteTodo(todo.id));
                }}
                size="small"
                colorType="danger"
              >
                X
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(ToDoContainer);
