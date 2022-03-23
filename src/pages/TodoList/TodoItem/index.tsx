import React, { useEffect, useRef, useState } from 'react';

import './todo-item.scss';

import Todo from '../../../models/todo';
import TodoItemContent from './TodoItemContent';

interface TodoItemInterface {
  todo: Todo;
  handleUpdateTodoStatus: (todo: Todo, checked: boolean) => void;
  handleDeleteTodo: (todo: Todo) => void;
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
  let clickCount: number = 0;
  let singleClickTimer: NodeJS.Timeout;

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
  });

  useEffect(() => {
    setTodoContent(todo.content);
  }, [todo]);

  const handleClickTodo = () => {
    clickCount++;
    if (clickCount === 1) {
      singleClickTimer = setTimeout(function () {
        clickCount = 0;
      }, 300);
    } else if (clickCount === 2) {
      clearTimeout(singleClickTimer);
      clickCount = 0;
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
    const content: string = todo.content;
    if (current && !current.contains(target as Node)) {
      setTodoContent(content);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.isTodoCompleted()}
        onChange={(e) => handleUpdateTodoStatus(todo, e.target.checked)}
      />
      <span className="todo-item__content" onClick={handleClickTodo}>
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
        onClick={() => handleDeleteTodo(todo)}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
