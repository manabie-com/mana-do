import React from 'react';
import TodoItem from '../todo-item';
import { ITodo } from '../../../types/todo';
import { isTodoCompleted } from '../../../helper';

interface Props {
  list: ITodo[],
  onDelete: Function,
  onUpdateTodoStatus: Function,
  onUpdate: (todoId: string, content: string) => void
}

const TodoList = ({ list, onDelete, onUpdateTodoStatus, onUpdate }: Props) => {
  if (!list.length) {
    return <div>Your Jobs is empty!</div>
  }
  return (
    <div className="ToDo__list">
    {
      list.map((item: ITodo, index) => {
        const { id, content } = item;
        const isDone = isTodoCompleted(item);
        return <TodoItem key={index} id={id}
          content={content}
          isDone={isDone}
          onDelete={() => onDelete(id)}
          onUpdateStatus={onUpdateTodoStatus}
          onUpdate={onUpdate}
          /> 
      })
    }
    </div>)
};

export default TodoList;