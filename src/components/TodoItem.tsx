import React, { useCallback } from 'react';
import {TodoStatus} from '../models/todo';

interface ITodoItem {
  id: string,
  onChange: (todoId: string, status: TodoStatus) => void,
  onDelete: (todoId: string) => void,
  content: string,
  status?: TodoStatus
}
const TodoItem = ({ id, onChange, onDelete, content, status }: ITodoItem) => {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, event.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id]);

  return (
    <div className="ToDo__item">
        <input
            type="checkbox"
            checked={status === TodoStatus.COMPLETED}
            onChange={handleChange}
        />
        <span>{content}</span>
        <button
            className="Todo__delete"
            onClick={handleDelete}
        >
            X
        </button>
    </div>
  )
}

export default TodoItem