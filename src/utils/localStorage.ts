import { Todo } from "models/todo";

export const persistTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const retrieveTodosFromLocalStorage = (): Todo[] => {
  const retrievedTodos: Todo[] = JSON.parse(
    localStorage.getItem("todos") || "[]"
  );

  return retrievedTodos;
};
