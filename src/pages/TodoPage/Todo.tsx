import React, { useState, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { isTodoCompleted } from 'utils';
import { Todo } from 'models/todo';
import { useUpdateTodo } from 'hooks/todos';
import useOnClickOutside from 'hooks/useClickOutside';

const SingleTodo = ({
  todo,
  onUpdateStatus,
  onDeleteTodo
}: {
  todo: Todo;
  onUpdateStatus: Function;
  onDeleteTodo: Function;
}) => {
  const ref = useRef();

  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(() => todo?.content);
  const { updateTodo } = useUpdateTodo();
  useOnClickOutside(ref, () => setIsEdit(false));

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content) {
      const updatedTodo = { ...todo, content } as Todo;
      updateTodo(updatedTodo, {
        onSuccess: () => {
          queryClient.invalidateQueries('todos');
          setIsEdit(false);
        }
      });
    }
  };

  return (
    <>
      <a className='Todo__item' onDoubleClick={() => setIsEdit(true)} ref={ref}>
        {isEdit ? (
          <form onSubmit={handleUpdateSubmit}>
            <input value={content} onChange={e => setContent(e.target.value)} />
          </form>
        ) : (
          <>
            <input
              type='checkbox'
              checked={isTodoCompleted(todo)}
              onChange={e => onUpdateStatus(e, todo)}
            />
            <span>{todo.content}</span>
            <button
              className='Todo__delete'
              onClick={() => onDeleteTodo(todo.id)}
            >
              X
            </button>
          </>
        )}
      </a>
    </>
  );
};

export default SingleTodo;
