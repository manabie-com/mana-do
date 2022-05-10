import React from 'react';
import { AppContext } from '../../context/toDoContext';
import { TodoStatus } from '../../models/todo';
import {
  deleteAllTodos,
  filterTodos,
  toggleAllTodos,
} from '../../store/actions';
import {
  getAllToDosStatus,
  getViewOptions,
  saveSelectionOptions,
} from '../../utils/localStorage';
import { playCheckedEffect } from '../../utils/mojs';

export type EnhanceTodoStatus = TodoStatus | 'ALL';

export default function ToDoToolbar() {
  const { state, dispatch } = React.useContext(AppContext);
  const toggleAllTodoRef = React.useRef<any>(null);

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
    toggleAllTodoRef.current.checked = false;
  };

  const checkedEffect = (e: React.MouseEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    const mousPosition = { x: e.clientX, y: e.clientY };
    if (checked) {
      playCheckedEffect(mousPosition);
    }
  };

  const onFilterTodos = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterTodos(e.target.value as EnhanceTodoStatus));
    saveSelectionOptions(e.target.value as EnhanceTodoStatus);
  };

  const defaultChecked =
    getAllToDosStatus(state.todos) === TodoStatus.COMPLETED;
  return (
    <div className='Todo__toolbar'>
      {state.todos.length > 0 ? (
        <div className='Toolbar__toggle_all'>
          <input
            ref={toggleAllTodoRef}
            id='toggle-all'
            aria-label='toggle-all-todos'
            type='checkbox'
            defaultChecked={defaultChecked}
            onChange={onToggleAllTodo}
            onClick={checkedEffect}
          />
        </div>
      ) : (
        <div />
      )}
      <div className='Todo__tabs'>
        <label htmlFor='filter'>View</label>
        <select
          defaultValue={getViewOptions()}
          name='filter'
          id='filter'
          onChange={onFilterTodos}
        >
          <option value='ALL'>All</option>
          <option value='ACTIVE'>Active</option>
          <option value='COMPLETED'>Completed</option>
        </select>
      </div>
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
