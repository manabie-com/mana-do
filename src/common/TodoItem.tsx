import React, { ReactPropTypes, useState } from 'react';
import { Todo, TodoStatus } from '../models/todo';
import { AppActions, deleteTodo, updateTodoStatus } from '../store/actions';

interface IProps {
  todo: Todo;
  dispatch: React.Dispatch<AppActions>;
}

type EnhanceTodoStatus = TodoStatus | 'ALL';

const TodoItem: React.FC<IProps> = ({ todo, dispatch }: IProps) => {
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTodoStatus(todo.id, e.target.checked));
  };

  const onDeleteTodo = (todoId: string): void => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <div key={todo.id} className='ToDo__item'>
      <input
        type='checkbox'
        checked={showing === todo.status}
        onChange={(e) => onUpdateTodoStatus(e)}
      />
      <span>{todo.content}</span>
      <button className='Todo__delete' onClick={() => onDeleteTodo(todo.id)}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
