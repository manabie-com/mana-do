import { Todo } from '../models/todo'

export abstract class IAPI {
  abstract signIn(username: string, password: string): Promise<string>
  abstract getTodos(): Promise<Array<Todo>>
  abstract createTodo(content: string): Promise<Todo>
  abstract updateTodo(todo: Todo): Promise<Todo>
  abstract deleteTodo(id: string): Promise<boolean>
  abstract deleteAllTodo(): Promise<boolean>
  abstract toggleAllTodo(completed: boolean): Promise<boolean>
}
