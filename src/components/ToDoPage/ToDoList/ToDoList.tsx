import React, { memo } from 'react';
import { ITodoList, Todo } from '../../../models/todo';
import ToDoItem from '../ToDoItem/ToDoItem';

const ToDoList = ({ todosList, ...props }: ITodoList) => {
  return (
    <div className="todo-list">
      {todosList.map((todo: Todo, index: number) => {
        return <ToDoItem todo={todo} index={index} {...props} />;
      })}
    </div>
  );
};

export default memo(ToDoList);
