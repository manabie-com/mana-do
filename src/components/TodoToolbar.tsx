import React from 'react';
import { isTodoCompleted } from '../utils';
import { TodoStatus } from '../models/todo';
import { TodoToolbarInterface } from '../models/todo';

const TodoToolbar = (props: TodoToolbarInterface) => {
  const activeTodos = props.todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className='Todo__toolbar' data-testid="todo-toolbar">
      {props.todos.length > 0 ? (
        <input
          type='checkbox'
          checked={activeTodos === 0}
          onChange={props.onToggleAllTodo}
        />
      ) : (
        <div />
      )}
      <div className='Todo__tabs'>
        <button className={ props.showing === 'ALL' ? 'Action__btn' : ''} onClick={() => props.setShowing('ALL')}>
          All
        </button>
        <button
          className={ props.showing === 'ACTIVE' ? 'Action__btn' : ''}
          onClick={() => props.setShowing(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={ props.showing === 'COMPLETED' ? 'Action__btn' : ''}
          onClick={() => props.setShowing(TodoStatus.COMPLETED)}
        >
          Completed
        </button>
      </div>
      <button onClick={props.onDeleteAllTodo}>
        Clear all todos
      </button>
    </div>
  );
};

export default TodoToolbar;
