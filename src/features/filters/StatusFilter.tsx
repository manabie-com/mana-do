import React from 'react';

import {TodoStatus} from '../../models/todo';

interface StatusFilter {
  status: TodoStatus;
  onChangeStatus: (status: TodoStatus) => void
}

const StatusFilter = ({status, onChangeStatus}: StatusFilter) => {
  const result = Object.keys(TodoStatus).map((item, i) => {
    const todoStatus: TodoStatus = TodoStatus[item as keyof typeof TodoStatus];
    return (
      <button
        key={todoStatus}
        className={`basic ${ status === todoStatus ? 'selected' : ''}`}
        onClick={() => onChangeStatus(todoStatus)}
      >
        {todoStatus}
      </button>
    )
  })

  return <div>{result}</div>
}

export default StatusFilter;
