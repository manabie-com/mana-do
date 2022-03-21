import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import './todo-item.scss';

import Todo from '../../../models/todo';
import TodoItemContent from './TodoItemContent';

interface TodoItemInterface {
  todo: Todo;
  handleUpdateTodoStatus: (todo: Todo, checked: boolean) => void;
  handleDeleteTodo: (todoID: string) => void;
  handleUpdateTodoContent: (todo: Todo, todoContent: string) => void;
}

const TodoItem = (props: TodoItemInterface) => {
  const {
    todo,
    handleUpdateTodoStatus,
    handleDeleteTodo,
    handleUpdateTodoContent,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [todoContent, setTodoContent] = useState(todo.content);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
  });

  useEffect(() => {
    setTodoContent(todo.content);
  }, [todo]);

  const handleOnClickTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.detail === 2 || (e.detail === 1 && isMobile)) {
      setIsEditing(true);
    }
  };

  const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveTodo(todoContent);
    }
  };

  const saveTodo = (content: string) => {
    handleUpdateTodoContent(todo, content);
    setIsEditing(false);
  };

  const handleClickOutside = (event: Event) => {
    const { current } = inputRef;
    const { target } = event;

    if (current && !current.contains(target as Node)) {
      saveTodo(current.value);
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.isTodoCompleted()}
        onChange={(e) => handleUpdateTodoStatus(todo, e.target.checked)}
      />
      <span className="todo-item__content" onClick={handleOnClickTodo}>
        <TodoItemContent
          inputRef={inputRef}
          isEditing={isEditing}
          todoContent={todoContent}
          onChangeTodo={onChangeTodo}
          onPressEnter={onPressEnter}
        />
      </span>
      <button
        className="todo-item__delete"
        onClick={() => handleDeleteTodo(todo.id)}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
