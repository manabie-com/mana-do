import { CreateTodoDto, DeleteTodoDto, Todo, ToggleAllTodosDto, UpdateTodoDto } from "../app/todo/todo.models";

export abstract class IAPI {
  abstract createTodo(createTodoDto: CreateTodoDto): Promise<Todo>;
  abstract getTodos(): Promise<Array<Todo>>;
  abstract updateTodo(updateTodoDto: UpdateTodoDto): Promise<Todo>;
  abstract toggleAllTodos(toggleAllTodosDto: ToggleAllTodosDto): Promise<Array<Todo>>;
  abstract deleteTodo(deleteTodoDto: DeleteTodoDto): Promise<string>;
  abstract deleteAllTodos(): Promise<void>;
}
