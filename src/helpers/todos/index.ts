import { Todo, TodoStatus } from "../../models/todo";

export const showTodos = (todos: Array<Todo>, type: string) => {
  return todos.filter((todo: Todo) => {
    switch (type) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });
};
