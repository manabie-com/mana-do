import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { Todo } from '../../../../../models';
import { Switch, EditableDiv } from '../../../../../components';
import { updateTodoStatus, deleteTodo, updateTodoContent } from '../../../../../store/actions';

interface Props {
  todo: Todo;
}

export const TodoCard: React.FC<Props> = ({ todo: { content, id, created_date, status } }) => {
  const dispatch = useDispatch();

  const isStatusSwitchActive = status === 'COMPLETED';

  const handleStatusChange = (value: boolean) => {
    if (value) {
      dispatch(updateTodoStatus(id, 'COMPLETED'));
    } else {
      dispatch(updateTodoStatus(id, 'ACTIVE'));
    }
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodo(id));
  };

  const handleContentChangeComplete = (value: string) => {
    dispatch(updateTodoContent(id, value));
  };

  return (
    <div className='todo-card todo-list__row'>
      <div className='todo-details'>
        <EditableDiv content={content} onComplete={handleContentChangeComplete} />
        <div>
          <b>Created date: </b>
          {moment(created_date).format('DD/MM/YYYY')}
        </div>
      </div>
      <div className='todo-status' title={isStatusSwitchActive ? 'Completed' : 'Active'}>
        <Switch value={isStatusSwitchActive} onChange={handleStatusChange} />
      </div>
      <div className='todo-actions'>
        <i className='fas fa-trash todo-card__delete-icon' onClick={handleDeleteClick}></i>
      </div>
    </div>
  );
};
