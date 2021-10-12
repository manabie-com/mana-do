import React from "react";
import { Todo, TodoStatus } from "models/todo";
import { EnhanceTodoStatus } from "pages/ToDoPage";
import TodoItem from "../TodoItem";
import "./style.css";

interface Props {
  todos: Todo[];
  onFilter: (status: EnhanceTodoStatus) => void;
  showing: EnhanceTodoStatus;
  onUpdateTodoStatus: (id: string, checked: boolean) => void;
  onUpdateTodo: (id: string, content: string) => Promise<boolean>;
  onDeleteTodo: (id: string) => void;
}

const ListToDo = (props: Props) => {
  const { todos, showing, onUpdateTodoStatus, onDeleteTodo, onUpdateTodo } =
    props;
  const showTodos = todos.filter((todo) => {
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
    <div data-testid="testid_ToDo__list" className="ToDo__list">
      {showTodos.map((todo, index) => {
        return (
          <TodoItem
            key={index}
            todo={todo}
            onUpdateTodoStatus={onUpdateTodoStatus}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
          />
        );
      })}
    </div>
  );
};

export default ListToDo;
