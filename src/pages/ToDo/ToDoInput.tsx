import React from 'react';
import { AppContext } from '../../context/toDoContext';
import Service from '../../service';
import { createTodo } from '../../store/actions';

export default function ToDoInput() {
  const inputRef = React.useRef<any>(null);
  const { dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (e.key === 'Enter' && value) {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));

      // It'd be a better user experience if we clear the input every time a to-do is created.
      // So users don't have to delete the old input value before create a new one.
      inputRef.current.value = '';
    }
  };

  return (
    <div className='Todo__creation'>
      <input
        ref={inputRef}
        className='Todo__input'
        placeholder='What need to be done?'
        onKeyDown={onCreateTodo}
      />
    </div>
  );
}
