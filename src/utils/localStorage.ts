import shortid from 'shortid';
import { Todo, TodoStatus } from '../models/todo';
import { EnhanceTodoStatus } from '../pages/ToDo/ToDoToolbar';

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
      user_id: 'firstUser',
    } as Todo,
  ];
}

/**
 * Check if all todos have COMPLETEDs status. Return COMPLETED if this is the case. Otherwise, return ACTIVE.
 * @returns ACTIVE or COMPLETED todos
 */
export function getAllToDosStatus(toDos: Todo[]): TodoStatus {
  if (toDos.length === 0) {
    return TodoStatus.ACTIVE;
  }
  const isAllToDosComplete = toDos.every(
    todo => todo.status === TodoStatus.COMPLETED,
  );
  return isAllToDosComplete ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
}

/**
 * Save selection options in ToDoToolbar to local storage
 */
export function saveSelectionOptions(value: EnhanceTodoStatus): void {
  window.localStorage.setItem('view', value);
}

/**
 * Get selection options from local storage. Return a default value if selection options don't exist.
 */
export function getViewOptions(): EnhanceTodoStatus {
  const view = window.localStorage.getItem('view');
  if (view) {
    return view as EnhanceTodoStatus;
  }
  return 'ALL';
}
