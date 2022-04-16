import React from 'react';
import { TodoStatus, Todo } from '../../models/todo';

interface TodoItemProps {
  todo: Todo;
  onDelete?: (id: string) => void;
  onComplete?: (id: string, isComplete: boolean) => void;
}

const TodoItem = (props: TodoItemProps) => {
  return (
    <div className="ToDo__item">
      <input
        type="checkbox"
        checked={TodoStatus.COMPLETED === props.todo.status}
        onChange={(e) =>
          props.onComplete && props.onComplete(props.todo.id, e.target.checked)
        }
      />
      <span>{props.todo.content}</span>
      <button
        className="Todo__delete"
        onClick={() => props.onDelete && props.onDelete(props.todo.id)}
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
