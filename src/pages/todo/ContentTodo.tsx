import React, { FC, useState, useRef } from 'react';
import classnames from 'classnames';

import { Todo, TodoStatus } from '../../models/todo';
import useClickOutside from '../../hooks/useClickOutside';

interface IContentTodo {
  todo: Todo;
  handleEditTodo: any;
}

const ContentTodo: FC<IContentTodo> = ({
  todo,
  handleEditTodo,
}: IContentTodo) => {
  const [isEdit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickOutside = () => {
    setEdit(false);
  };

  useClickOutside(inputRef, onClickOutside);

  const onUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        let updatedTodo = { ...todo, content: inputRef.current.value };
        handleEditTodo(updatedTodo);
        inputRef.current.value = '';
      } catch (err) {
        console.log(err);
      } finally {
        setEdit(false);
      }
    }
  };

  const onEditContent = () => {
    setEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <>
      {!isEdit ? (
        <span
          className={classnames({
            'Todo__item-deleted': todo.status === TodoStatus.DELETED,
          })}
          onDoubleClick={onEditContent}
        >
          {todo.content}
        </span>
      ) : (
        <input
          ref={inputRef}
          defaultValue={todo.content}
          onKeyDown={onUpdateTodo}
        />
      )}
    </>
  );
};

export default ContentTodo;
