import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Todo, TodoStatus } from '../../models/todo';
import { playCheckedEffect } from '../../utils/mojs';
import { AppContext } from '../../context/toDoContext';
import {
  deleteTodo,
  updateTodoContent,
  updateTodoStatus,
} from '../../store/actions';

interface ToDoItemProps {
  todo: Todo;
}

export default function ToDoItem({ todo, ...props }: ToDoItemProps) {
  const { dispatch } = React.useContext(AppContext);
  const transistionRef = React.useRef<any>(null);

  const onEditTodo = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.contentEditable = 'true';
    e.currentTarget.style.outline = 'double gray';
    e.currentTarget.focus();
  };

  const onBlurTodo = (
    e: React.FocusEvent<HTMLSpanElement>,
    originalContent: string,
  ) => {
    e.currentTarget.contentEditable = 'false';
    e.currentTarget.style.outline = 'none';
    e.currentTarget.innerText = originalContent;
  };

  const onUpdateTodo = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    id: string,
  ) => {
    if (e.key === 'Enter') {
      dispatch(updateTodoContent(id, e.currentTarget.innerText));
      e.currentTarget.contentEditable = 'false';
    }
  };

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any,
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const checkedEffect = (e: React.MouseEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    const mousPosition = { x: e.clientX, y: e.clientY };
    if (checked) {
      playCheckedEffect(mousPosition);
    }
  };

  return (
    <CSSTransition
      {...props}
      nodeRef={transistionRef}
      classNames='item'
      timeout={450}
    >
      <div ref={transistionRef}>
        <div
          className='ToDo__item'
          style={
            todo.status === TodoStatus.COMPLETED
              ? { backgroundColor: '#c9c9c9' }
              : undefined
          }
        >
          <input
            aria-label='todo-item-checkbox'
            type='checkbox'
            checked={TodoStatus.COMPLETED === todo.status}
            onChange={e => onUpdateTodoStatus(e, todo.id)}
            onClick={checkedEffect}
          />
          <span
            onDoubleClick={onEditTodo}
            onBlur={e => onBlurTodo(e, todo.content)}
            onKeyDown={e => onUpdateTodo(e, todo.id)}
          >
            {todo.content}
          </span>
          <button
            aria-label='delete-todo-button'
            className='Todo__delete'
            onClick={() => onDeleteTodo(todo.id)}
          >
            <svg
              width='100%'
              height='100%'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z'
                fill='gray'
              />
            </svg>
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}
