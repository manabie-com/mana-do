import { TodoStatus } from "../constant";

export default function devidedTodos(todos) {
  const todoActive = [];
  const todoCompleted = [];
  if (Array.isArray(todos)) {
    todos.forEach((todo) => {
      if (todo.status === TodoStatus.ACTIVE) {
        todoActive.push(todo);
      } else if (todo.status === TodoStatus.COMPLETED) {
        todoCompleted.push(todo);
      }
    });
  }
  todoActive.reverse();
  todoCompleted.sort().reverse();
  return { todoActive, todoCompleted };
}
