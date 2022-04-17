import React, { useEffect, useReducer, useState } from 'react';

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
  const [contentInput, setContentInput] = useState<string>('');

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
      if (contentInput) {
        const resp = await Service.createTodo(contentInput);
        dispatch(createTodo(resp));
        setContentInput('');
      }
    }
  };

  const onUpdateTodoStatus = (todoId: string, isComplete: boolean) => {
    Service.updateTodo(todoId, {
      status: isComplete ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
    });
    dispatch(updateTodoStatus(todoId, isComplete));
  };

  const onUpdateTodoContent = (todoId: string, content: string) => {
    Service.updateTodo(todoId, { content });
    dispatch(updateTodoContent(todoId, content));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    Service.toggleAllTodos(e.target.checked);
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    Service.deleteAllTodos();
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (todoId: string) => {
    Service.deleteTodo(todoId);
    dispatch(deleteTodo(todoId));
  };

  return (
    <div className="todo__container">
      <div className="todo__creation">
        <input
          className="todo__input"
          placeholder="What need to be done?"
          value={contentInput}
          onChange={(e) => setContentInput(e.target.value)}
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="todo__toolbar">
        <div className="todo__tabs">
          <button
            className={`action__btn ${
              showing === 'ALL' ? 'action__btn-active' : ''
            }`}
            onClick={() => setShowing('ALL')}
          >
            All
          </button>
          <button
            className={`action__btn ${
              showing === TodoStatus.ACTIVE ? 'action__btn-active' : ''
            }`}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`action__btn ${
              showing === TodoStatus.COMPLETED ? 'action__btn-active' : ''
            }`}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
        {filteredTodos.length > 0 && (
          <div className="action__checkbox">
            <input
              id="toggle-todo"
              type="checkbox"
              onChange={onToggleAllTodo}
            />
            <label htmlFor="toggle-todo">Toggle</label>
          </div>
        )}
      </div>
      <div className="todo__list">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                onComplete={onUpdateTodoStatus}
                onDelete={onDeleteTodo}
                onUpdateContent={onUpdateTodoContent}
              />
            );
          })
        ) : (
          <div>Todo not found</div>
        )}
      </div>
    </div>
  );
};

export default ToDoPage;
