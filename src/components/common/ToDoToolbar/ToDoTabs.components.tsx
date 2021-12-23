import React from 'react';
import { TodoStatus } from '../../../models/todo';
import { EnhanceTodoStatus } from '../../page/ToDoPage';
import ActionButton from '../ActionButton/ActionButton.components';

interface Props {
  setShowing: (value: React.SetStateAction<EnhanceTodoStatus>) => void;
}
const buttonTabs: Array<{ key: EnhanceTodoStatus; value: string }> = [
  {
    key: 'ALL',
    value: 'ALL',
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
const ToDoTabs: React.FC<Props> = ({ setShowing }: Props) => {
  return (
    <>
      <div className='Todo__tabs'>
        {buttonTabs.map(({ key, value }) => {
          return (
            <ActionButton key={key} onClick={() => setShowing(key)}>
              {value}
            </ActionButton>
          );
        })}
      </div>
    </>
  );
};

export default ToDoTabs;
