import React from "react";
import { Todo } from "models/todo";
import TodoItem from "components/TodoItem";

export interface TodoListProps {
  list: Todo[];
  onUpdateTodoStatus: (todoId: string, checked: boolean) => void;
  onDeleteTodo: (todoId: string) => void;
  onUpdateTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  list = [],
  onUpdateTodoStatus,
  onDeleteTodo,
  onUpdateTodo,
}) => {
  if (list.length === 0) {
    return (
      <div className="Todo__list--empty">You have nothing to do today.</div>
    );
  }
  return (
    <div className="ToDo__list">
      {list.map((todo, index) => (
        <TodoItem
          key={`todo-item-${index}`}
          todo={todo}
          onUpdateStatus={onUpdateTodoStatus}
          onDelete={onDeleteTodo}
          onUpdate={onUpdateTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
