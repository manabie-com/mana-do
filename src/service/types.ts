import { Todo } from '../models/todo';

export abstract class IAPI {
    abstract getTodos(): Promise<Array<Todo>>
    abstract createTodo(content: string): Promise<Todo>
    abstract updateTodo(todo: Todo, id: string): Promise<Todo>
    abstract deleteTodo(id: string): Promise<string>
    abstract saveTodos(todos: Todo[]): Promise<Array<Todo>>
}