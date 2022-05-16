import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';
import { deleteTodo, updateTodoContent } from './store/actions';
import { isTodoCompleted, getLocalStorage } from './utils/index';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [todoEditId, setTodoEditId] = useState<string>('');
  const inputRef = useRef<any>(null);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current.value) {
      const isDuplicate = todos.find(
        (todo) =>
          todo.content.toLowerCase() === inputRef.current.value.toLowerCase()
      );
      if (isDuplicate) {
        alert('Duplicate task!');
        return;
      }

      if (todoEditId) {
        dispatch(updateTodoContent(todoEditId, inputRef.current.value));
        setTodoEditId('');
      } else {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
      }
      inputRef.current.value = '';
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

  const deleteTodoById = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const discardContent = () => {
    inputRef.current.value = '';
  };

  const editTodoById = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    inputRef.current.value = todo?.content;
    setTodoEditId(id);
  };

  const todosShowing = useMemo(() => {
    return todos.filter((todo) => showing === 'ALL' || todo.status === showing);
  }, [showing, todos]);

  useEffect(() => {
    (async () => {
      const todos = getLocalStorage();
      dispatch(setTodos(todos));
    })();
  }, []);

  return (
    <div className="Todo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
          onBlur={discardContent}
          autoFocus
        />
      </div>
      <div className="Todo__list">
        {todosShowing.map((todo, index) => {
          return (
            <div key={index} className="Todo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <button
                className="Todo__edit"
                onClick={() => editTodoById(todo.id)}
              >
                Edit
              </button>
              <button
                className="Todo__delete"
                onClick={() => deleteTodoById(todo.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
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
    </div>
  );
};

export default ToDoPage;
