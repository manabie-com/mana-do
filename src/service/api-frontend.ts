import { safeJsonParse } from './../utils/index'
import { IAPI } from './types'
import { Todo, TodoStatus } from '../models/todo'
import shortid from 'shortid'

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === 'firstUser' && password === 'example') {
      return Promise.resolve(mockToken)
    }

    return Promise.reject('Incorrect username/password')
  }

  async createTodo(content: string): Promise<Todo> {
    const todos = safeJsonParse(localStorage.getItem('todos') || '', [])
    const newTodo: Todo = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    }

    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]))

    return Promise.resolve(newTodo)
  }

  async getTodos(): Promise<Todo[]> {
    return safeJsonParse(localStorage.getItem('todos') || '', [])
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    const todos: Todo[] = safeJsonParse(localStorage.getItem('todos') || '', [])
    const index = todos.findIndex((item) => item.id === todo.id)
    if (index > -1) {
      todos[index] = {
        ...todos[index],
        status: todo.status,
        content: todo.content,
      }
    }

    localStorage.setItem('todos', JSON.stringify(todos))
    return Promise.resolve(todo)
  }

  async deleteTodo(todoId: string): Promise<boolean> {
    const prevTodos: Todo[] = safeJsonParse(
      localStorage.getItem('todos') || '',
      []
    )
    const todos = prevTodos.filter((todo) => todo.id !== todoId)
    localStorage.setItem('todos', JSON.stringify(todos))

    return Promise.resolve(true)
  }

  async deleteAllTodo(): Promise<boolean> {
    localStorage.setItem('todos', JSON.stringify([]))
    return Promise.resolve(true)
  }
}

export default new ApiFrontend()
