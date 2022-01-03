import classnames from 'classnames';
import { EnhanceTodoStatus, TodoStatus } from 'models';
import * as React from 'react';
import './TodoToolbar.css';
export interface TodoToolbarProps {
  todoAmount:number;
  activeTodos: number;
  showing:EnhanceTodoStatus
  onToggleAllTodo(value:boolean): void;
  onDeleteAllTodo(): void;
  onSetShowing(option: EnhanceTodoStatus): void;
}

export const TodoToolbar = ({
  todoAmount,
  activeTodos,
  showing,
  onToggleAllTodo,
  onDeleteAllTodo,
  onSetShowing,
}: TodoToolbarProps) => {

  return (
    <div className='Todo__toolbar'>
      {todoAmount > 0 ? (
        <input
          type='checkbox'
          checked={activeTodos === 0}
          onChange={(e) => onToggleAllTodo(e.target.checked)}
        />
      ) : (
        <div />
      )}
      <div className='Todo__tabs'>
        <button className={classnames('Action__btn',{'Action__btn--active' : showing === 'ALL'})} onClick={() => onSetShowing('ALL')}>
          All
        </button>
        <button className={classnames('Action__btn',{'Action__btn--active' : showing === TodoStatus.ACTIVE})} onClick={() => onSetShowing(TodoStatus.ACTIVE)}>
          Active
        </button>
        <button className={classnames('Action__btn',{'Action__btn--active' : showing === TodoStatus.COMPLETED})} onClick={() => onSetShowing(TodoStatus.COMPLETED)}>
          Completed
        </button>
        <button className='Action__btn' onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
      <div className='Todo__left'>{activeTodos} {activeTodos > 1 ? 'todos' : 'todo'} left</div>
    </div>
  );
};
