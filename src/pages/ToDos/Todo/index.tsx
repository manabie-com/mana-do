import React, { useRef, useState } from 'react';

import { Todo } from '../../../models/todo';
import Service from '../../../service';
import { isTodoCompleted } from '../../../utils';

interface IToDo {
  todo: Todo;
  onUpdateTodoStatus: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (todo: Todo) => void;
}

const ToDo: React.FC<IToDo> = ({
  todo,
  onUpdateTodoStatus,
  onDeleteTodo,
  onEditTodo,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const editTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      setLoading(true);
      const payload = {
        ...todo,
        content: inputRef.current.value,
      };

      // CALL API UPDATE TODO IN BACKEND DATABASE
      await Service.editTodo(payload).then((todo) => {
        setEditMode(false);
        setLoading(false);
        onEditTodo(todo);
      });
    }
  };

  const onCancelEdit = (content: string) => {
    if (inputRef.current) {
      inputRef.current.value = content;
      setEditMode(false);
    }
  };

  return (
    <div key={todo.id} className='ToDo__item'>
      {editMode ? (
        <>
          <input
            ref={inputRef}
            defaultValue={todo.content}
            type='text'
            onKeyDown={editTodo}
            className='Todo__edit'
          />
          {loading ? (
            <span>loading</span>
          ) : (
            <span onClick={() => onCancelEdit(todo.content)}>Cancel</span>
          )}
        </>
      ) : (
        <>
          <input
            type='checkbox'
            checked={isTodoCompleted(todo)}
            onChange={(e) => onUpdateTodoStatus(e, todo.id)}
          />
          <span onDoubleClick={() => setEditMode(true)}>{todo.content}</span>
          <button
            className='Todo__delete'
            onClick={() => onDeleteTodo(todo.id)}
          >
            X
          </button>
        </>
      )}
    </div>
  );
};

export default ToDo;
