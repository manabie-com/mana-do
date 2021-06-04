import {Todo, TodoStatus} from '../models/todo';

export abstract class IAPI {
  abstract authorize(token : string) : Promise<void>
  abstract signIn(username : string, password : string) : Promise<string>
  abstract getTodos() : Promise<Array<Todo>>
  abstract createTodo(content : string) : Promise<Todo>
  abstract updateTodoStatus(todoId : string, status : TodoStatus) : Promise<Todo>
  abstract updateTodoContent(todoId : string, content : string) : Promise<Todo>
  abstract updateAllTodosStatuses(status : TodoStatus) : Promise<TodoStatus>
  abstract deleteTodo(todoId : string) : Promise<string>
  abstract deleteAllTodos() : Promise<void>
}
