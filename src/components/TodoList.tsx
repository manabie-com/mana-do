import * as React from "react";
import { EnhanceTodoStatus, Todo, TodoStatus } from "../models/todo";
import { AppActions, updateTodoContent, updateTodoStatus } from "../store/actions";
import { TodoItem } from "./TodoItem";

interface TodoListProps extends React.HTMLAttributes<HTMLDivElement> {
  dispatch: React.Dispatch<AppActions>;
  todos: Array<Todo>;
  showing: EnhanceTodoStatus;
  onRemove: (todoId: string) => void;
}

export const TodoList = (props: TodoListProps) => {
  const { dispatch, todos, showing, onRemove } = props;

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const showTodos = todos.filter((todo: Todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  return (
    <div className="ToDo__list">
      {showTodos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdateTodoStatus}
          onRemove={onRemove}
          onToggle={(todoId, checked) => dispatch(updateTodoStatus(todoId, checked))}
          onEdit={(todoId, content) => dispatch(updateTodoContent(todoId, content))}
        />
      ))}
    </div>
  );
};
