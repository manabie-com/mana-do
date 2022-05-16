import React, { useEffect, useRef } from 'react';

import { Todo } from '../../../models/todo';
import { isTodoCompleted } from '../../../utils';

type TodoItemProps = {
  todo: Todo;
  onDeleteTodo: (todoId: string) => void;
  onUpdateTodoContent: (newContent: string, todoId: string) => void;
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
};

const TodoItem = ({
  todo,
  onUpdateTodoStatus,
  onDeleteTodo,
  onUpdateTodoContent,
}: TodoItemProps) => {
  const [toggle, setToggle] = React.useState(true);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setToggle(true);
      }
    }

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [inputRef]);

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onUpdateTodoContent(inputRef.current.value, todo.id);
      setToggle(true);
    }
  };

  const toggleInput = () => {
    setToggle(false);
  };

  return (
    <div className='Todo__item'>
      <input
        type='checkbox'
        data-testid={`todo-item-checkbox-${todo.id}`}
        checked={isTodoCompleted(todo)}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
      />
      {toggle ? (
        <span data-testid={`todo-item-${todo.id}`} onDoubleClick={toggleInput}>
          {todo.content}
        </span>
      ) : (
        <input
          data-testid={`todo-item-${todo.id}`}
          className='Todo__input'
          ref={inputRef}
          type='text'
          defaultValue={todo.content}
          onKeyDown={handleChange}
        />
      )}
      <button
        data-testid={`todo-item-remove-${todo.id}`}
        className='Todo__delete'
        onClick={() => onDeleteTodo(todo.id)}
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
