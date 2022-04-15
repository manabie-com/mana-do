import { Todo } from '../models/todo'

export const getTodoIndex = (todos: Todo[], todoId: string): number => {
  return todos.findIndex((todo) => todo.id === todoId)
}

export default getTodoIndex
