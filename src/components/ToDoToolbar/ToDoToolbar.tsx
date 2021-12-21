import React, { memo } from 'react';
import { Todo, TodoStatus } from '../../models/todo';
import { EnhanceTodoStatus } from '../ToDoPage';

export interface ToDoToolbarProps {
  todos: Todo[];
  activeTodos: number;
  onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowing: React.Dispatch<React.SetStateAction<EnhanceTodoStatus>>;
  onDeleteAllTodo: () => void;
}

function ToDoToolbar({
  todos,
  activeTodos,
  onToggleAllTodo,
  setShowing,
  onDeleteAllTodo,
}: ToDoToolbarProps) {
  return (
    <div className="Todo__toolbar">
      {todos.length > 0 ? (
        <input
          type="checkbox"
          checked={activeTodos === 0}
          onChange={onToggleAllTodo}
        />
      ) : (
        <div />
      )}
      <div className="Todo__tabs">
        <button
          className="Action__btn Action__btn--default"
          onClick={() => setShowing('ALL')}
        >
          All
        </button>
        <button
          className="Action__btn Action__btn--primary"
          onClick={() => setShowing(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className="Action__btn Action__btn--success"
          onClick={() => setShowing(TodoStatus.COMPLETED)}
        >
          Completed
        </button>
      </div>
      <button
        className="Action__btn Action__btn--danger"
        onClick={onDeleteAllTodo}
      >
        Clear all todos
      </button>
    </div>
  );
}

export default memo(ToDoToolbar);
