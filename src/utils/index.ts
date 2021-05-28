import {Todo, TodoStatus} from '../models/todo';

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED;
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE;
}

export function getTodoItemsByStatus(status: string, totoList: Todo[]) {
  return totoList.filter(todo => {
      switch (status) {
        case TodoStatus.ACTIVE:
            return todo.status === TodoStatus.ACTIVE;
        case TodoStatus.COMPLETED:
            return todo.status === TodoStatus.COMPLETED;
        default:
            return true;
    }
  })
}

export function debounce(func: Function, ms: number) {
   // @ts-ignore
  let timeout = null
  return () => {
      // @ts-ignore
      clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, ...arguments), ms)
  }
}
