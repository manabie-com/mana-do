import { Todo } from '../models/todo';

class Storage {
  public todos: Todo[] = [];

  constructor() {
    this.load();
  }

  public addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.save();
  }

  public getTodo(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  public removeTodo(id: string): void {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      console.warn(`Todo with ID ${id} is not found.`);
    } else {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.save()
    }
  }

  private save(): void {
    localStorage.setItem('APP_TODOS', JSON.stringify(this.todos));
  }

  private load(): void {
    const rawData = localStorage.getItem('APP_TODOS');
    if (!rawData) {
      return;
    }

    try {
      const todos = JSON.parse(rawData);
      if (todos && todos.length) {
        this.todos = todos;
      }
    } catch (err) {
      console.warn('Parse data failed: ', err);
    }
  }
}

export default new Storage();
