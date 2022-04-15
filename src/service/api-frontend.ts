import { IAPI } from './types'
import { Todo, TodoStatus, UpdateTodoData } from '../models/todo'
import shortid from 'shortid'
import storage from './storage'
import delay from '../utils/delay'

class ApiFrontend extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const todo: Todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    } as Todo
    storage.addTodo(todo)
    await delay(1000)
    return todo
  }

  async getTodos(): Promise<Todo[]> {
    const todos = storage.getTodos()
    await delay(1000)
    return todos.reverse()
  }

  async updateTodo(todoId: string, data: UpdateTodoData): Promise<Todo> {
    const todo = storage.updateTodo(todoId, data)
    await delay(1000)
    return todo
  }

  async deleteTodo(todoId: string): Promise<void> {
    await delay(1000)
    storage.removeTodo(todoId)
  }

  async deleteAllTodos(): Promise<void> {
    await delay(1000)
    storage.removeAllTodos()
  }

  async toggleAllTodos(todoIds: string[], status: TodoStatus): Promise<void> {
    todoIds.map((id: string) => storage.updateTodo(id, { status }))
    await delay(500)
  }
}

export default new ApiFrontend()
