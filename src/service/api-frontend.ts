import { IAPI } from './types'
import { Todo, TodoStatus } from '../models/todo'
import shortid from 'shortid'
import { getLocalItem, LocalStorageKeys } from '../helpers/local-storage'

class ApiFrontend extends IAPI {
  /**
   * Don't need use Promise.resolve
   * The return function type `Promise<Todo>` will auto return a Promise
   */
  async createTodo(content: string): Promise<Todo> {
    return {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser'
    } as Todo
  }

  async getTodos(): Promise<Todo[]> {
    const todosStringify = getLocalItem(LocalStorageKeys.todoKey)
    if (todosStringify) {
      return JSON.parse(todosStringify) as Todo[]
    }
    return []
  }
}

export default new ApiFrontend()
