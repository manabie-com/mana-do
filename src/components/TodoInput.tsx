import React, { useCallback, useRef } from 'react';

interface ITodoInput {
  id?: string,
  className: string
  placeholder: string,
  clearTextWhenEnter?: boolean,
  onEnter: (content: string, id?: string) => void,
  content: string,
}
const TodoInput = ({ id, className, placeholder, onEnter, content, clearTextWhenEnter }: ITodoInput) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const handleEnter = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    var code = event.keyCode || event.which;
    if(code === 13 && inputEl.current) { //13 is the enter keycode
      onEnter(inputEl.current.value, id);
      if (clearTextWhenEnter) {
        inputEl.current.value = '';
      }
    } 
  }, []);

  return (
    <input
      ref={inputEl}
      className={className}
      placeholder={placeholder}
      onKeyDown={handleEnter}
    />
  )
}

export default TodoInput