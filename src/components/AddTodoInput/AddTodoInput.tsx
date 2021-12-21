import React, { forwardRef } from 'react';

export interface AddTodoInputProps {
  onCreateTodo: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const AddTodoInput = forwardRef<HTMLInputElement, AddTodoInputProps>(
  ({ onCreateTodo }, ref) => {
    return (
      <div className="Todo__creation">
        <input
          ref={ref}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
    );
  }
);

export default AddTodoInput;
