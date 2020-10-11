import { initialState } from "src/store/reducer";
import { Todo, TodoStatus } from "../models/todo";

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function saveStateToLocalStorage(state: Object) {
  const jsonState = JSON.stringify(state);
  localStorage.setItem("state", jsonState);
}

export function getStateFromLocalStorage() {
  try {
    const jsonState = localStorage.getItem("state") || "";
    const parsedState = JSON.parse(jsonState);
    return parsedState;
  } catch (err) {
    return initialState;
  }
}
