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
