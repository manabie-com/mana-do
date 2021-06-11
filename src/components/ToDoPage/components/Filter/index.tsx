import React from 'react';

import styles from './index.module.scss';
import ButtonGroup from '../../../ButtonGroup';
import Button from '../../../Button';
import { EnhanceTodoStatus, TodoStatus } from '../../../../models/todo';

interface FilterProps {
  value: EnhanceTodoStatus;
  onChange: (status: EnhanceTodoStatus) => void;
}

const Filter = ({ value, onChange }: FilterProps) => {
  const handleOnChange = (status: EnhanceTodoStatus) => () => {
    onChange(status);
  };

  return (
    <div className={styles.Filter}>
      <ButtonGroup>
        <Button isPrimary={value === 'ALL'} pressed={value === 'ALL'} onClick={handleOnChange('ALL')}>
          All
        </Button>
        <Button
          isPrimary={value === TodoStatus.ACTIVE}
          pressed={value === TodoStatus.ACTIVE}
          onClick={handleOnChange(TodoStatus.ACTIVE)}
        >
          Active
        </Button>
        <Button
          isPrimary={value === TodoStatus.COMPLETED}
          pressed={value === TodoStatus.COMPLETED}
          onClick={handleOnChange(TodoStatus.COMPLETED)}
        >
          Completed
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Filter;
