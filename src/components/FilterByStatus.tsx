import * as React from 'react';
import { Status, Todo, TodoStatus } from '../models/todo';
import { isTodoCompleted } from '../utils';

interface FilterTodosProps extends React.HTMLAttributes<HTMLDivElement> {
  todos: Array<Todo>;
  setStatus: (status: Status) => void;
  onToggleAll: (checked: boolean) => void;
  onDeleteAll: () => void;
}

export const FilterByStatus = (props: FilterTodosProps) => {
  const { todos, setStatus, onToggleAll, onDeleteAll } = props;

  const activeTodos = todos.reduce(function (accum: number, todo: Todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleAll(e.target.checked);
    
  };

  const onDeleteAllTodo = () => {
    onDeleteAll()
  };

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
        <button onClick={() => setStatus("ALL")}>
          All
        </button>
        <button onClick={() => setStatus(TodoStatus.ACTIVE)}>
          Active
        </button>
        <button onClick={() => setStatus(TodoStatus.COMPLETED)}>
          Completed
        </button>
      </div>
      <button className="Action__btn" onClick={onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  );
};
