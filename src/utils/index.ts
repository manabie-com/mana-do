import { Theme, ThemeType } from 'models/theme';
import { TodoStatus } from '../models/todo';

export function isTodoCompleted(status?: TodoStatus): boolean {
  return status === TodoStatus.COMPLETED;
}

export function isTodoActive(status?: TodoStatus): boolean {
  return status === TodoStatus.ACTIVE;
}

export function getTodoStatus(checked: boolean): TodoStatus {
  return checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
} 

export function isDarkTheme(theme: Theme): boolean {
  return theme === ThemeType.DARK;
}

export function getItemLeft(itemNumber: number): string {
  return `${itemNumber} ${itemNumber === 1 ? "item" : "items"} left`
}

export function isJsonString(string: string): boolean {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
}