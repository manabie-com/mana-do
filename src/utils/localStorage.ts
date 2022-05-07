import shortid from "shortid";
import { Todo, TodoStatus } from "../models/todo";

/**
 * Save todo to local storage
 * @param todos - list of todos
 */
export function saveToLocalStorage(todos: Todo[]): void {
  const toDosJSON = JSON.stringify(todos);
  window.localStorage.setItem('todos', toDosJSON);
}

/**
 * Get todos from local storage. Return a list of todos with a sample todo if todos don't exist.
 * @returns list of todos
 */
export function getToDosFromLocalStorage(): Todo[] {
  const toDosJSON = window.localStorage.getItem('todos');
  if (toDosJSON) {
    return JSON.parse(toDosJSON);
  }
  return [
    {
      content: 'Content',
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: "firstUser",
    } as Todo
  ]
}

/**
 * Check if all todos have COMPLETEDs status. Return COMPLETED if this is the case. Otherwise, return ACTIVE.
 * @returns ACTIVE or COMPLETED todos
 */
export function getAllToDosStatus(): TodoStatus {
  const toDos = getToDosFromLocalStorage();
  if (toDos.length === 0) {
    return TodoStatus.COMPLETED;
  }
  const isAllToDosComplete = toDos.every(todo => todo.status === TodoStatus.COMPLETED);
  return isAllToDosComplete ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
}
