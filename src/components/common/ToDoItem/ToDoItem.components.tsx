import React from 'react';
import { useToDoPageContext } from '../../../context/ToDoPageProvider';
import { TodoStatus } from '../../../models/todo';
import Service from '../../../service';
import {
  deleteTodo,
  updateTodoContent,
  updateTodoStatus,
} from '../../../store/actions';
import Input from '../Input/Input.components';

interface Props {
  checked: boolean;
  content: string;
  id: string;
  createdDate: Date;
}

/* I created a new component to separate the handling logic 
making us have as many stateless components as possible
1. Reusable
2. Capable of maintenance
3. Flexibility
*/
const ToDoItem: React.FC<Props> = ({ id, checked, content, createdDate }) => {
  const { dispatch } = useToDoPageContext();
  const [edit, setEdit] = React.useState<boolean>(false);
  const [inputError, setInputError] = React.useState<boolean>(false);
  const [focused, setFocused] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleOnBlur = () => {
    setFocused(false);
  };
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      if (e.key === 'Enter') {
        if (value) {
          // optimis update
          Service.updateContentTodo(id, value);
          dispatch(updateTodoContent(id, value));
          setEdit(false);
        } else {
          setInputError(true);
        }
      } else {
        setInputError(false);
      }
    }
  };
  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    // optimis update
    Service.updateTodo(id, checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE);
    dispatch(updateTodoStatus(id, e.target.checked));
  };
  const handleOnClickDeleteTodo = (): void => {
    // optimis delete
    Service.deleteTodo(id);
    dispatch(deleteTodo(id));
  };
  const handleOnDoubleClickToEdit = (): void => {
    setEdit(true);
    setFocused(true);
  };
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = content;
      inputRef.current.focus();
    }
  }, [content, edit]);
  React.useEffect(() => {
    if (!focused) {
      setEdit(false);
    }
  }, [focused]);
  return (
    <div className='ToDo__item' onDoubleClick={handleOnDoubleClickToEdit}>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onUpdateTodoStatus(e)}
      />
      {edit ? (
        <Input
          onBlur={handleOnBlur}
          ref={inputRef}
          className='ToDo__item--text-input'
          error={inputError}
          placeholder='This field require value'
          onKeyDown={handleOnKeyDown}
        />
      ) : (
        <>
          <span className='ToDo__item--content'>{content}</span>
          <span className='ToDo__item--content'>
            {createdDate.toLocaleString()}
          </span>
        </>
      )}
      <button className='Todo__delete' onClick={handleOnClickDeleteTodo}>
        X
      </button>
    </div>
  );
};

export default ToDoItem;
