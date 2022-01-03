import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}
export function formatDate(date:string):string {
  const currentDate = new Date(date)
  const day = String(currentDate.getDate()).padStart(2,'0')
  const month = String(currentDate.getMonth()+1).padStart(2,'0')
  const year = currentDate.getFullYear();
  return `${day}/${month}/${year}`
}