import { IAPI } from './types'
import { Todo, TodoStatus } from '../models/todo'
import shortid from 'shortid'

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
  async signIn (username: string, password: string): Promise<string> {
    if (username === 'firstUser' && password === 'example') {
      return await Promise.resolve(mockToken)
    }

    return await Promise.reject(new Error('Incorrect username/password'))
  }

  async createTodo (content: string): Promise<Todo> {
    const todo: Todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser'
    }

    return await Promise.resolve(todo)
  }

  async getTodos (): Promise<Todo[]> {
    return []
  }
}

export default new ApiFrontend()
