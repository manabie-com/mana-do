import React from 'react';

import { Switch } from '../../../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { todosSelector } from '../../../../../store/reducers/todos.reducer';
import { updateAllTodosStatus, deleteAllTodos } from '../../../../../store/actions';

export const TodoListHeader = () => {
  const dispatch = useDispatch();
  const todos = useSelector(todosSelector);

  const isAllTodosCompleted = todos.every(({ status }) => status === 'COMPLETED');

  const handleToggleAllStatus = (value) => {
    if (value) {
      dispatch(updateAllTodosStatus('COMPLETED'));
    } else {
      dispatch(updateAllTodosStatus('ACTIVE'));
    }
  };

  const handleDeleteClick = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className='todo-list__row todo-list__header'>
      <div className='todo-details'>TODO</div>
      <div className='todo-status' title='Toggle all todos'>
        <Switch value={isAllTodosCompleted} onChange={handleToggleAllStatus} />
      </div>
      <div className='todo-actions'>
        <i className='fas fa-trash todo-card__delete-icon' onClick={handleDeleteClick} title='Delete all'></i>
      </div>
    </div>
  );
};
