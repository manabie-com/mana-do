import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoContent,
  updateTodoStatus,
} from './store/actions';
import Service from './service';
import { Todo, TodoStatus } from './models/todo';
import { isTodoCompleted } from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';

interface TodoItemProps {
  todo: Todo;
  onUpdateStatus(e: ChangeEvent<HTMLInputElement>, todo: Todo): void;
  onUpdateContent(newContent: string, todo: Todo): void;
  onDelete(todo: Todo): void;
}

const ToDoItem = ({ todo, onUpdateStatus, onUpdateContent, onDelete }: TodoItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(todo.content || '');
  }, [todo]);

  const onDoubleClickTodoItem = () => {
    setEditMode(true);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlurHandler = () => {
    setEditMode(false);
    onUpdateContent(value, todo);
  };

  return !editMode ? (
    <div className='ToDo__item' onDoubleClick={onDoubleClickTodoItem}>
      <input type='checkbox' checked={isTodoCompleted(todo)} onChange={(e) => onUpdateStatus(e, todo)} />
      <span>{todo.content}</span>
      <button className='Todo__delete' onClick={() => onDelete(todo)}>
        X
      </button>
    </div>
  ) : (
    <input placeholder='Todo' value={value} onChange={onChangeInput} onBlur={onBlurHandler} />
  );
};

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = '';
    }
  };

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
    const checked = e.target.checked;
    (async () => {
      await Service.updateTodo(todo.id, todo.content, checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE);
      dispatch(updateTodoStatus(todo.id, checked));
    })();
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

  const deleteTodoHandler = async (todo: Todo) => {
    try {
      await Service.removeTodo(todo);
      dispatch(deleteTodo(todo.id));
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateTodoItemContent = (newContent: string, todo: Todo) => {
    (async () => {
      await Service.updateTodo(todo.id, newContent, todo.status || TodoStatus.ACTIVE);
      dispatch(updateTodoContent(todo.id, newContent));
    })();
  };

  return (
    <div className='ToDo__container'>
      <div className='Todo__creation'>
        <input ref={inputRef} className='Todo__input' placeholder='What need to be done?' onKeyDown={onCreateTodo} />
      </div>
      <div className='ToDo__list'>
        {showTodos.map((todo, index) => {
          return (
            <ToDoItem
              key={index}
              todo={todo}
              onUpdateStatus={onUpdateTodoStatus}
              onUpdateContent={onUpdateTodoItemContent}
              onDelete={deleteTodoHandler}
            />
          );
        })}
      </div>
      <div className='Todo__toolbar'>
        {todos.length > 0 ? (
          <input
            type='checkbox'
            checked={activeTodos === 0 && showing !== TodoStatus.ACTIVE}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className='Todo__tabs'>
          <button className='Action__btn' onClick={() => setShowing('ALL')}>
            All
          </button>
          <button className='Action__btn' onClick={() => setShowing(TodoStatus.ACTIVE)}>
            Active
          </button>
          <button className='Action__btn' onClick={() => setShowing(TodoStatus.COMPLETED)}>
            Completed
          </button>
        </div>
        <button className='Action__btn' onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
