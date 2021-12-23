import React from 'react';
import { useToDoPageContext } from '../../../context/ToDoPageProvider';
import Service from '../../../service';
import { createTodo } from '../../../store/actions';
import Input from '../Input/Input.components';

/* I created a new component to separate the handling logic 
making us have as many stateless components as possible
1. Reusable
2. Capable of maintenance
3. Flexibility
*/
const ToDoInput: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [emptyInput, setEmptyInput] = React.useState<boolean>(false);
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
    if (inputRef.current) {
      const { value } = inputRef.current;
      if (e.key === 'Enter') {
        if (value) {
          handleOnSubmitTodoInput(inputRef.current.value);
          inputRef.current.value = '';
        } else {
          setEmptyInput(true);
        }
      }
      if (value) {
        setEmptyInput(false);
      }
    }
  };
  return (
    <Input
      ref={inputRef}
      className='Todo__input'
      error={emptyInput}
      placeholder={
        emptyInput ? 'This field cannot be left blank' : 'What need to be done?'
      }
      onKeyDown={onCreateTodo}
    />
  );
};

export default React.memo(ToDoInput);
