import React from 'react';
import { useToDoPageContext } from '../../../context/ToDoPageProvider';
import Service from '../../../service';
import { createTodo } from '../../../store/actions';

/* I created a new component to separate the handling logic 
making us have as many stateless components as possible
1. Reusable
2. Capable of maintenance
3. Flexibility
*/
const ToDoInput: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { dispatch } = useToDoPageContext();
  const handleOnSubmitTodoInput = React.useCallback(
    async (value: string) => {
      // it will good to be optimis
      const resp = await Service.createTodo(value);
      dispatch(createTodo(resp));
    },
    [dispatch]
  );
  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      handleOnSubmitTodoInput(inputRef.current.value);
      inputRef.current.value = '';
    }
  };
  return (
    <input
      ref={inputRef}
      className='Todo__input'
      placeholder='What need to be done?'
      onKeyDown={onCreateTodo}
    />
  );
};

export default React.memo(ToDoInput);
