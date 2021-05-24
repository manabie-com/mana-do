import {Draggable} from 'react-beautiful-dnd';
import React from 'react';
import DraggableCell from '../draggable-cell/DraggableCell';
import Classes from './DraggableRow.module.scss';

export interface IDraggableRowProps {
  draggableId: string;
  key: string;
  children?: any;
  index: number;
  isActiveRearrange: boolean;
}

const DraggableRow = (props: IDraggableRowProps) => {
  const {key, draggableId, index, children, isActiveRearrange} = props;
  return (
    <Draggable key={key} draggableId={draggableId} index={index}>
      {(provided, snapshot) => {
        const draggingClassName = snapshot.isDragging ? Classes.dragging : '';
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`${Classes.DraggableRow} ${draggingClassName}`}
          >
            <DraggableCell provided={provided} isActive={isActiveRearrange}/>
            {children({provided, snapshot})}
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableRow;
