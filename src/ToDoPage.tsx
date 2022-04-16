import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  deleteTodo,
  updateTodoStatus,
  updateTodoContent,
} from './store/actions';
import Service from './service';
import { TodoStatus, Todo } from './models/todo';
import TodoItem from './components/todo/TodoItem';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const onUpdateTodoStatus = (todoId: string, isComplete: boolean) => {
    dispatch(updateTodoStatus(todoId, isComplete));
  };

  const onUpdateTodoContent = (todoId: string, content: string) => {
    dispatch(updateTodoContent(todoId, content));
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
      <div className="todo__list">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onComplete={onUpdateTodoStatus}
              onDelete={onDeleteTodo}
              onUpdateContent={onUpdateTodoContent}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ToDoPage;
