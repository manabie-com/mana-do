import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function numberPadLeft(num: number, padCount: number, padChar: string): string {
  
  let numStr = num.toString();
  const numLength = numStr.length;
  const missingPadCount = padCount - numLength;
  for(let i = 0; i < missingPadCount; i++) {
    numStr = padChar + numStr;
  }
  return numStr;
}