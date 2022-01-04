import { Todo, TodoStatus } from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function saveTodosLocalStorage(todos: Array<Todo>): void {
  localStorage.setItem('TODO_ITEMS', JSON.stringify(todos));
}

export function getTodosLocalStorage(): Array<Todo> {
  const todoObj = localStorage.getItem('TODO_ITEMS');
  if (!todoObj) return [];

  return JSON.parse(todoObj);
}

export function saveTodoItemToLocalStorage(todo: Todo): void {
  const currentTodos = getTodosLocalStorage();
  const updatedTodos = [...currentTodos, todo];

  saveTodosLocalStorage(updatedTodos);
}

export function removeTodoItemFromLocalStorage(todo: Todo): Array<Todo> {
  const currentTodos = getTodosLocalStorage();
  const filteredTodo = currentTodos.filter((item) => item.id !== todo.id);

  saveTodosLocalStorage(filteredTodo);
  return filteredTodo;
}

export function updateTodoItemLocalStorage(todoId: string, content: string, status: TodoStatus): void {
  const currentTodos = getTodosLocalStorage();

  const updatedTodos = currentTodos.map((todo) => {
    if (todo.id === todoId) {
      return { ...todo, content, status };
    }
    return todo;
  });

  saveTodosLocalStorage(updatedTodos);
}
