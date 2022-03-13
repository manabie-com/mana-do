import React, { useState, useRef, FocusEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Todo, TodoStatus } from '../models/todo';
import { updateTodoStatus, deleteTodo, updateTodo } from './actions';

interface ItemInterface {
  todo: Todo;
}

const ToDoItem = ({ todo }: ItemInterface) => {
  const [openOverlay, setOpenOverlay] = useState(true);
  const dispatch = useDispatch();
  const textInputEl = useRef<HTMLInputElement>(null);

  const handleUpdateTodo = (text: string) => {
    const dataPayload = {
      ...todo,
      content: text,
    };
    dispatch(updateTodo(dataPayload));
  };

  const handleEditTodo = () => {
    setOpenOverlay(false);
    if (textInputEl.current !== null) {
      textInputEl.current.focus();
    }
  };

  const onDeleteTodo = (idTodo: string) => {
    dispatch(deleteTodo(idTodo));
  };

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    setOpenOverlay(true);
    handleUpdateTodo(event.target.value);
  };

  const onUpdateTodoStatus = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTodoStatus(todo.id, event.target.checked));
  };

  return (
    <div className='ToDo__item'>
      <div className='Todo__wrapper'>
        <input
          type='checkbox'
          checked={TodoStatus.COMPLETED === todo.status}
          onChange={onUpdateTodoStatus}
        />
        <div className='Todo__field'>
          <input
            className='field__input'
            type='text'
            defaultValue={todo.content}
            ref={textInputEl}
            onBlur={handleOnBlur}
          />
          {openOverlay && (
            <div
              className='field__overlay'
              onDoubleClick={handleEditTodo}
            ></div>
          )}
        </div>
      </div>
      <button className='Todo__delete' onClick={() => onDeleteTodo(todo.id)}>
        &#10005;
      </button>
    </div>
  );
};

export default ToDoItem;
