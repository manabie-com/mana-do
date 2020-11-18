import shortid from 'shortid'

import { Todo, TodoStatus } from '../models/todo'

import reducer from './reducer'
import {
  createTodo,
  updateTodoStatus,
  toggleAllTodos,
  deleteTodo,
  deleteAllTodos,
  updateTodo,
} from './actions'

const mockTodos: Todo[] = [
  {
    content: 'mock todo 1',
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'mockUser',
  },
  {
    content: 'mock todo 2',
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'mockUser',
  },
  {
    content: 'mock todo 3',
    created_date: new Date().toISOString(),
    status: TodoStatus.COMPLETED,
    id: shortid(),
    user_id: 'mockUser',
  },
]

describe('App reducer', () => {
  it('should create a new todo with action createTodo', () => {
    const { todos } = reducer({ todos: [] }, createTodo(mockTodos[0]))
    expect(todos).toEqual([mockTodos[0]])
  })

  it('should update status of a todo with action updateTodoStatus', () => {
    const { todos } = reducer({ todos: [...mockTodos] }, updateTodoStatus(mockTodos[1].id, true))

    expect(todos[1].status).toBe(TodoStatus.COMPLETED)
  })

  it('should update status of all todos with action toggleAllTodos', () => {
    const { todos } = reducer({ todos: [...mockTodos] }, toggleAllTodos(true))
    todos.forEach(todo => expect(todo.status === TodoStatus.COMPLETED))
  })

  it('should delete a todo with action deleteTodo', () => {
    const { todos } = reducer({ todos: [...mockTodos] }, deleteTodo(mockTodos[0].id))
    expect(todos.length).toBe(mockTodos.length - 1)
    expect(todos.every(todo => todo.id !== mockTodos[0].id)).toBe(true)
  })

  it('should delete all todos with action deleteAllTodos', () => {
    const { todos } = reducer({ todos: [...mockTodos] }, deleteAllTodos())
    expect(todos.length).toBe(0)
  })

  it('should update content of a todo with action updateTodo', () => {
    const newContent = 'new content'
    const { todos } = reducer({ todos: [...mockTodos] }, updateTodo(mockTodos[1].id, newContent))
    expect(todos[1].content).toBe(newContent)
  })
})

