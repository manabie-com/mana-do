import React from 'react';
import Classes from './FilterContent.module.scss';
import {TodoStatus} from '../../../../models/todo';

export interface IFilterCellProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export interface IFilterStatus {
  name: string;
  key: string;
}

const filterStatuses: IFilterStatus[] = [
  {
    name: 'All',
    key: '',
  },
  {
    name: 'Active',
    key: TodoStatus.ACTIVE,
  },
  {
    name: 'completed',
    key: TodoStatus.COMPLETED,
  }
]


const FilterContent = (props: IFilterCellProps) => {
  const {filterStatus, setFilterStatus} = props;
  return (
    <div className={Classes.FilterContent}>
      {
        filterStatuses.map(status => {
          const isActive = (!status.key && !filterStatus) || (status.key === filterStatus);
          const className = isActive
            ? `${Classes.FilterButton} ${Classes.active}`
            : Classes.FilterButton;
          return (
            <button onClick={() => setFilterStatus(status.key)}
                    key={status.name}
                    className={className}>
              {status.name}
            </button>
          );
        })
      }
    </div>
  );
};

export default FilterContent;
