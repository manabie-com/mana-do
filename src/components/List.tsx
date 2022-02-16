import * as React from 'react';
import { Status, Todo } from '../models/todo';
import { itemFilteredByStauts } from '../service/adapters'
import { Item } from './Item';

interface TodoListProps {
  todos: Array<Todo>;
  status: Status;
  onRemove: (todoId: string) => void;
  onEdit: (id: string, content: string) => void;
  onUpdateStatus: (
    todoId: string,
    checked: boolean,
  ) => void;
}

export const List = (props: TodoListProps) => {
  const { todos, status, onRemove, onEdit, onUpdateStatus } = props;
  const itemFiltered = itemFilteredByStauts(todos, status);

  const onUpdateTodoStatus = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target
    onUpdateStatus(id, checked);
  };

  const onToggleTodoStatus = (id: string, checked: boolean) => {
    onUpdateStatus(id, checked);
  }

  const onEditTodoStatus = (id: string, content: string) => {
    onEdit(id, content);
  }

  return (
    <div className="ToDo__list">
      {itemFiltered.map((todo: Todo, idx: number) => (
        <Item
          key={idx}
          todo={todo}
          onUpdate={onUpdateTodoStatus}
          onRemove={onRemove}
          onToggle={onToggleTodoStatus}
          onEdit={onEditTodoStatus}
        />
      ))}
    </div>
  );
};
