import React, { useEffect, useReducer, useRef, useState, RefObject } from 'react';

import reducer, { initialState } from './store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  editTodoContent,
  toggleEditTodo
} from './store/actions';
import Service from './service';
import { Todo, TodoStatus } from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [filteredTodos, setFilterTodos] = useState([] as Todo[]);
  const [isAllTodoCompleted, setAllTodosCompleted] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState('');
  const editInputRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    const resp = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]

    resp.map((todo) => {
      todo.isEditing = false;
      return todo;
    });
    dispatch(setTodos(resp || []));
  }, []);

  useEffect(() => {
    // Toggle toolbar checkbox if all task completed
    const index = todos.findIndex((todo) => todo.status === TodoStatus.ACTIVE);
    setAllTodosCompleted(index === -1);

    // Store todos
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  useEffect(() => {
    setFilterTodos(() => {
      if (showing === 'ALL') return todos;
      return todos.filter((todo) => todo.status === showing);
    });
  }, [todos, showing]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const content = inputRef.current.value

    if (e.key === 'Enter' && content) {
      const resp = await Service.createTodo(content);
      dispatch(createTodo(resp));
      inputRef.current.value = '';
    }
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onUpdateTodoContent = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string
  ) => {
    if (e.key === 'Enter') {
      if (newTodoContent) dispatch(editTodoContent(todoId, newTodoContent));
      dispatch(toggleEditTodo(todoId, false));
      setNewTodoContent('');
    }
  };

  const onShowEditTodo = (todoId: string, content: string) => {
    setNewTodoContent(content);
    dispatch(toggleEditTodo(todoId, true));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const clickOutsidehandler = () => {
    setNewTodoContent('');
    dispatch(toggleEditTodo(editInputRef.current.dataset.id, false));
  };

  useClickOutside(editInputRef, clickOutsidehandler);

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
      <div className="ToDo__list">
        {filteredTodos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              {
                todo.isEditing ? (
                  <input
                    ref={editInputRef}
                    className="Todo__edit"
                    value={newTodoContent}
                    data-id={todo.id}
                    onChange={(e) => setNewTodoContent(e.target.value)}
                    onKeyDown={(e) => onUpdateTodoContent(e, todo.id)}
                  />
                ) : (
                  <span onDoubleClick={() => onShowEditTodo(todo.id, todo.content)}>{todo.content}</span>
                )
              }
              <button className="Todo__delete" onClick={() => onDeleteTodo(todo.id)}>X</button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input type="checkbox" checked={isAllTodoCompleted} onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button
            className="Action__btn"
            onClick={() => setShowing('ALL')}
          >
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


function useClickOutside(ref: RefObject<HTMLElement>, handler: (event: Event) => void) {
  useEffect(
    () => {
      const listener = (event: Event) => {
        // Do nothing if clicking ref's element or descendent elements
        const el = ref?.current;
        if (!el || el.contains((event?.target as Node) || null)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    [ref, handler]
  );
}

export default ToDoPage;
