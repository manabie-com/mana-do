import React, { useRef} from 'react';
import { TodoFormInterface } from '../models/todo';


const TodoForm = (props: TodoFormInterface) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Make sure have value before creating a todo
    if (e.key === 'Enter' && inputRef.current && inputRef.current.value) {
      props.onKeyDown(inputRef.current.value)
      inputRef.current.value = '';
    }
  }
  
  return (
    <div className="Todo__creation" data-testid="todo-form">
      <input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default TodoForm