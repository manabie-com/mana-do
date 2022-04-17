import { Todo, TodoStatus } from '../models/todo'

export function isTodoCompleted(todo: Todo): boolean {
  return todo.status === TodoStatus.COMPLETED
}

export function isTodoActive(todo: Todo): boolean {
  return todo.status === TodoStatus.ACTIVE
}

export function capitalizeFirstLetter(string = ''): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const dispatchForCode = function (
  event: React.KeyboardEvent<HTMLInputElement>,
  callback: (code: string | number | undefined) => void
) {
  let code

  if (event.key !== undefined) {
    code = event.key
  } else if (event.keyCode !== undefined) {
    code = event.keyCode
  }

  callback(code)
}
