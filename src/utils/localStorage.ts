import shortid from "shortid";
import { Todo, TodoStatus } from "../models/todo";

export function saveToLocalStorage(todos: Todo[]): void {
  const toDosJSON = JSON.stringify(todos);
  window.localStorage.setItem('todos', toDosJSON);
}

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

export function getAllToDosStatus(): TodoStatus {
  const toDos = getToDosFromLocalStorage();
  if (toDos.length === 0) {
    return TodoStatus.COMPLETED;
  }
  const isAllToDosComplete = toDos.every(todo => todo.status === TodoStatus.COMPLETED);
  return isAllToDosComplete ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
}
