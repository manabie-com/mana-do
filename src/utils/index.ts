import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function isGranted(permissionName: string): boolean {
  if (!permissionName || permissionName === '') {
    return true
  }
  /// Todo: validate permission in real world
  return true
}
