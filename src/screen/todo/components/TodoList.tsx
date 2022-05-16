import React from 'react';
import { Todo } from '../../../models/todo';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (todoId: string) => void;
  onUpdateTodoContent: (newContent: string, todoId: string) => void;
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
};

const TodoList = ({
  todos = [],
  onUpdateTodoStatus,
  onDeleteTodo,
  onUpdateTodoContent,
}: TodoListProps) => {
  return (
    <div className='Todo__list' data-testid='todo-list'>
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodoStatus={onUpdateTodoStatus}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodoContent={onUpdateTodoContent}
        />
      ))}
    </div>
  );
};

export default TodoList;
