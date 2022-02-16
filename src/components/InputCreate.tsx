import * as React from 'react';
import Service from '../service';

interface CreateTodoProps {
  onCreate: (data: any) => void;
}

export const InputCreate = (props: CreateTodoProps) => {
  const { onCreate } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      const resp = await Service.createTodo(inputRef.current.value);
      inputRef.current.value = '';
      onCreate(resp);
    }
  };

  return (
    <div className="Todo__creation">
      <input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
      />
    </div>
  );
};
