import * as React from 'react';
import { EnhanceTodoStatus, TodoStatus } from '../../models/todo';

export interface IFiltererProps {
  setShowing: (status: EnhanceTodoStatus) => void;
}

export function Filterer(props: IFiltererProps) {
  const { setShowing } = props;
  return (
    <div className="Todo__tabs">
      <button className="Action__btn" onClick={() => setShowing('ALL')}>
        All
      </button>
      <button className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
        Active
      </button>
      <button className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
        Completed
      </button>
    </div>
  );
}
