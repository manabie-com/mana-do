import { Todo, TodoStatus } from 'models/todo';

const colors = ["gray", "red", "pink", "grape", "violet",
  "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "orange"];

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function generateColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}