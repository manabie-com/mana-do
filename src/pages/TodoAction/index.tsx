import './todo-action.scss';

import Todo from '../../models/todo';
import React from 'react';
import { TodoStatus, TodoStatuses } from '../../constants/todo';
import classnames from 'classnames';

interface TodoActionInterface {
  todoList?: Array<Todo>;
  onToggleAllTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStatusFilter: (status: TodoStatus) => void;
  onDeleteAllTodo: () => void;
  statusActive: TodoStatus;
  areAllTodoActive: number;
}

const TodoAction = (props: TodoActionInterface) => {
  const {
    todoList,
    onToggleAllTodo,
    setStatusFilter,
    onDeleteAllTodo,
    statusActive,
    areAllTodoActive,
  } = props;

  return (
    <div className="toolbar">
      {todoList && todoList.length > 0 && (
        <input
          type="checkbox"
          checked={areAllTodoActive === 0}
          onChange={onToggleAllTodo}
        />
      )}
      <div className="toolbar__tabs">
        {TodoStatuses.map((status) => (
          <button
            key={status}
            className={classnames('toolbar__tabs-btn', {
              'toolbar__tabs--active': status === statusActive,
            })}
            data-test={status}
            onClick={() => setStatusFilter(status)}>
            {status}
          </button>
        ))}
        <button className="toolbar__tabs-btn" onClick={onDeleteAllTodo}>
          Clear all todo
        </button>
      </div>
    </div>
  );
};

export default TodoAction;
