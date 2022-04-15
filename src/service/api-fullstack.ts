import { IAPI } from './types'
import { Todo, TodoStatus, UpdateTodoData } from '../models/todo'
import axios from '../utils/axios'
import { AxiosResponse } from 'axios'

class ApiFullstack extends IAPI {
  async createTodo(content: string): Promise<Todo> {
    const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
      content,
    })

    return resp.data.data
  }

  async getTodos(): Promise<Array<Todo>> {
    const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`)

    return resp.data.data
  }

  async updateTodo(todoId: string, data: UpdateTodoData): Promise<Todo> {
    const resp = await axios.put<AxiosResponse<Todo>>(`/tasks/${todoId}`, data)

    return resp.data.data
  }

  async deleteTodo(todoId: string): Promise<void> {
    console.log('Todo is deleted')
  }

  async deleteAllTodos(): Promise<void> {
    console.log('All todos are deleted')
  }

  async toggleAllTodos(todoIds: string[], status: TodoStatus): Promise<void> {
    console.log('Some todos are ', status)
  }
}

export default new ApiFullstack()
