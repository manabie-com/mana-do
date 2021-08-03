import React from 'react';
import { Todo } from '../models/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Array<Todo>;
  updateTodoStatus: (todoId: string, completed: boolean) => void;
  deleteTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  updateTodoStatus,
  deleteTodo,
  updateTodo,
}) => {
  return (
    <ul className="Todo__list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodoStatus={updateTodoStatus}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
