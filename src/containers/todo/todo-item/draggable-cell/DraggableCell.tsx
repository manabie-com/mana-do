import React from 'react';
import TodoCell from '../../todo-cell/TodoCell';
import Classes from './DraggableCell.module.scss';

export interface IDraggableCellProps {
  className?: string;
  provided: any;
  isActive: boolean;
}

const DraggableCell = (props: IDraggableCellProps) => {
  const {provided, className, isActive} = props;
  const dragIconElement = isActive
    ? <div className={Classes.DraggableIcon} {...provided.dragHandleProps}></div>
    : null;

  return (
    <TodoCell className={className} width="40px" minWidth="40px" maxWidth="40px" center={true}>
      {dragIconElement}
    </TodoCell>
  );
};

export default DraggableCell;
