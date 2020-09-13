import React from 'react';
import TodoItem from '../todo-item';
import { ITodo } from '../../../types/todo';


const TodoList = ({ list }: { list: ITodo[] }) => {
  return (
    <div className="ToDo__list">
    {
      list.map((item, index) => {
        const { id, content, status } = item;
        return <TodoItem key={index} id={id} content={content} isDone={false} onDelete={() => {}} onUpdateStatus={() => {}} /> 
      })
    }
    </div>)
};

export default TodoList;