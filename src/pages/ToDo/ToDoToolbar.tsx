import React from 'react';
import { AppContext } from '../../context/toDoContext';
import { TodoStatus } from '../../models/todo';
import { deleteAllTodos, toggleAllTodos } from '../../store/actions';
import { getAllToDosStatus } from '../../utils/localStorage';
import { playCheckedEffect } from '../../utils/mojs';

export default function ToDoToolbar() {
  const { state, dispatch } = React.useContext(AppContext);
  const [allToDoStatus, setAllToDoStatus] = React.useState<TodoStatus>(() =>
    getAllToDosStatus(),
  );
  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
    setAllToDoStatus(
      e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
    );
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const checkedEffect = (e: React.MouseEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    const mousPosition = { x: e.clientX, y: e.clientY };
    if (checked) {
      playCheckedEffect(mousPosition);
    }
  };
  return (
    <div className='Todo__toolbar'>
      {state.todos.length > 0 ? (
        <div className='Toolbar__toggle_all'>
          <input
            id='toggle-all'
            aria-label='toggle-all-todos'
            type='checkbox'
            defaultChecked={allToDoStatus === TodoStatus.COMPLETED}
            onChange={onToggleAllTodo}
            onClick={checkedEffect}
          />
          <label htmlFor='toggle-all'>
            Mark all as{' '}
            {allToDoStatus === TodoStatus.COMPLETED ? 'active' : 'completed'}
          </label>
        </div>
      ) : (
        <div />
      )}
      <button
        disabled={Boolean(state.todos.length === 0)}
        className='Action__btn'
        onClick={onDeleteAllTodo}
        arial-label='delete-all-todos'
      >
        Clear all todos
      </button>
    </div>
  );
}
