import React from 'react';
import { TodoStatus } from '../../../models/todo';
import { EnhanceTodoStatus } from '../../page/ToDoPage';
import ActionButton from '../ActionButton/ActionButton.components';

interface Props {
  setShowing: (value: React.SetStateAction<EnhanceTodoStatus>) => void;
  activeTab: EnhanceTodoStatus;
}
const buttonTabs: Array<{ key: EnhanceTodoStatus; value: string }> = [
  {
    key: 'ALL',
    value: 'All',
  },
  {
    key: TodoStatus.ACTIVE,
    value: 'Active',
  },
  {
    key: TodoStatus.COMPLETED,
    value: 'Completed',
  },
];
const ToDoTabs: React.FC<Props> = ({ setShowing, activeTab }: Props) => {
  return (
    <>
      <div className='Todo__tabs'>
        {buttonTabs.map(({ key, value }) => {
          return (
            <ActionButton
              className={`${activeTab === key ? 'Todo__tabs--active' : ''}`}
              key={key}
              onClick={() => setShowing(key)}
            >
              {value}
            </ActionButton>
          );
        })}
      </div>
    </>
  );
};

export default ToDoTabs;
