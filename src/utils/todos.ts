import { Todo } from "models/todo";

export function getLocalTodos() {
  const todos = window.localStorage.getItem("todos");
  if (!todos) return [];
  return JSON.parse(todos) as Todo[];
}

export function setLocalTodos(todos: Todo[]) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

export function createLocalTodo(todo: Todo) {
  const todos = getLocalTodos() as Todo[];
  todos.push(todo);
  setLocalTodos(todos);
}

export function updateLocalTodo(todo: Todo) {
  const todos = getLocalTodos() as Todo[];
  const selectedIdx = todos.findIndex((item) => item.id === todo.id);
  if (selectedIdx === -1) return;
  todos.splice(selectedIdx, 1, todo);
  setLocalTodos(todos);
}

export function deleteLocalTodo(todoId: string) {
  const todos = getLocalTodos() as Todo[];
  const selectedId = todos.findIndex((item) => item.id === todoId);
  if (selectedId === -1) return;
  todos.splice(selectedId, 1);
  setLocalTodos(todos);
}

export function deleteAllLocalTodos() {
  window.localStorage.removeItem("todos");
}
