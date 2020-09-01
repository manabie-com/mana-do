import React from 'react';

import { Todo } from '../../../../models';
import { TodoCard } from './TodoCard';
import { TodoListHeader } from './TodoListHeader';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  if (!todos.length) return null;

  return (
    <div className='todo__list'>
      <TodoListHeader />

      {todos.map((todo) => {
        return <TodoCard key={todo.id} todo={todo} />;
      })}
    </div>
  );
};
