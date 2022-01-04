import React, { useEffect, useReducer, useRef, useState } from 'react';

import { TodoStatus } from './models/todo';
import Service from './service';
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  setUsers,
  toggleAllTodos,
  updateTodoStatus,
} from './store/actions';
import reducer, { initialState } from './store/reducer';
import { isTodoCompleted } from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [{ users, todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    (async () => {
      const users = await Service.getUsers();
      dispatch(setUsers(users || []));
    })();
  }, []);

  const onUserChanged = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    const tasks = await Service.getTodos(userId);
    dispatch(setTodos(tasks || []));
  }

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && selectRef.current && inputRef.current) {
      const resp = await Service.createTodo({
        userId: selectRef.current.value,
        content: inputRef.current.value,
      });
      dispatch(createTodo(resp));
      inputRef.current.value = '';
    }
  };

  const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    const isChecked = e.target.checked
    await Service.updateTodo(todoId, isChecked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE);
    dispatch(updateTodoStatus(todoId, isChecked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteTodo = async (todoId: string) => {
    await Service.deleteTodo(todoId);
    dispatch(deleteTodo(todoId))
  }

  const onDeleteAllTodo = async () => {
    await Service.deleteTodos(selectRef?.current?.value);
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
    <div className="task-container">
      <select className="user-list" ref={selectRef} onChange={(e) => onUserChanged(e)}>
        <option value="">Select a user</option>
        {users.map(({ id, name }, index) => (
          <option key={index} value={id}>
            {name}
          </option>
        ))}
      </select>
      <div className="task-creation">
        <input ref={inputRef} className="task-input" placeholder="What need to be done?" onKeyDown={onCreateTodo} />
      </div>
      <div className="task-list">
        {showTodos.map((todo, index) => {
          return (
            <div key={index} className="task-item">
              <input type="checkbox" checked={isTodoCompleted(todo)} onChange={(e) => onUpdateTodoStatus(e, todo.id)} />
              <span>{todo.content}</span>
              <button className="task-delete" onClick={() => onDeleteTodo(todo.id)}>
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="task-toolbar">
        {todos.length > 0 ? <input type="checkbox" checked={activeTodos === 0} onChange={onToggleAllTodo} /> : <div />}
        <div className="task-tabs">
          <button onClick={() => setShowing('ALL')}>All</button>
          <button onClick={() => setShowing(TodoStatus.ACTIVE)}>Active</button>
          <button onClick={() => setShowing(TodoStatus.COMPLETED)}>Completed</button>
        </div>
        <button onClick={onDeleteAllTodo}>Clear all todos</button>
      </div>
    </div>
  );
};

export default ToDoPage;
