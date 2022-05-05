import { Todo, TodoStatus } from '../models/todo'

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE
}

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
    timeout = setTimeout(() => func(...args), waitFor)
  }

  return debounced as (...args: Parameters<F>) => ReturnType<F>
}
