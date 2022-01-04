import * as React from "react";
import { EnhanceTodoStatus, Todo, TodoStatus } from "../models/todo";
import { AppActions, deleteTodo, updateTodoStatus } from "../store/actions";
import { isTodoCompleted } from "../utils";


interface TodoListProps extends React.HTMLAttributes<HTMLDivElement> {
  dispatch: React.Dispatch<AppActions>;
  todos: Array<Todo>;
  showing: EnhanceTodoStatus;
}

export const TodoList = (props: TodoListProps) => {
  const { dispatch, todos, showing } = props;

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
      {showTodos.map((todo: Todo, index: number) => {
        return (
          <div key={index} className="ToDo__item">
            <input
              type="checkbox"
              checked={isTodoCompleted(todo)}
              onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <span>{todo.content}</span>
            <button
              className="Todo__delete"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};
