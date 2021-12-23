import React from 'react';

interface Props {
  handleOnSubmit: (value: string) => Promise<void>;
}


/* I created a new component to separate the handling logic 
making us have as many stateless components as possible
1. Reusable
2. Capable of maintenance
3. Flexibility
*/
const ToDoInput: React.FC<Props> = ({ handleOnSubmit }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      handleOnSubmit(inputRef.current.value);
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
