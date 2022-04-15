import { Todo, UpdateTodoData } from '../models/todo'
import { getTodoIndex } from '../utils/getTodoIndex'

class Storage {
  public todos: Todo[] = []

  constructor() {
    this.load()
  }

  public getTodos(): Todo[] {
    return this.todos
  }

  public addTodo(todo: Todo): void {
    this.todos.push(todo)
    this.save()
  }

  public getTodo(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id)
  }

  public updateTodo(id: string, { status, content }: UpdateTodoData): Todo {
    const index = getTodoIndex(this.todos, id)
    if (index === -1) {
      console.warn(`Todo with ID ${id} is not found.`)
    } else {
      if (status) {
        this.todos[index].status = status
      }
      if (content) {
        this.todos[index].content = content
      }
      this.save()
    }
    return this.todos[index]
  }

  public removeTodo(id: string): void {
    const index = getTodoIndex(this.todos, id)
    if (index === -1) {
      console.warn(`Todo with ID ${id} is not found.`)
    } else {
      this.todos = this.todos.filter((todo) => todo.id !== id)
      this.save()
    }
  }

  public removeAllTodos(): void {
    this.todos.length = 0
    this.save()
  }

  private save(): void {
    localStorage.setItem('APP_TODOS', JSON.stringify(this.todos))
  }

  private load(): void {
    const rawData = localStorage.getItem('APP_TODOS')
    if (!rawData) {
      return
    }

    try {
      const todos = JSON.parse(rawData)
      if (todos && todos.length) {
        this.todos = todos
      }
    } catch (err) {
      console.warn('Parse data failed: ', err)
    }
  }
}

export default new Storage()
