import shortid from 'shortid'

import reducer, { AppState } from '../reducer'
import { 
  setTodos, 
  createTodo, 
  updateTodoStatus, 
  updateTodo,
  deleteTodo,
  deleteAllTodos,
  toggleAllTodos
} from '../actions'
import { Todo, TodoStatus } from '../../models/todo'

describe('Todo reducer', () => {

  test('should set todo-list successfully', () => {
    const initState: AppState = { todos: [] }
    const todoList: Todo[] = [
      {
        id: shortid(),
        content: "New todo",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.ACTIVE,
      }
    ]
    const newState = reducer(initState, setTodos(todoList))
    expect(newState.todos.length).toBe(todoList.length)
    expect(newState.todos[0]).toEqual(todoList[0])
  })

  test('should create a todo successfully', () => {
    const initState: AppState = { todos: [] }
    const todo: Todo = {
      id: shortid(),
      content: "New todo",
      user_id: "newUser",
      created_date: new Date().toUTCString(),
      status: TodoStatus.ACTIVE,
    }
    const newState = reducer(initState, createTodo(todo))
    expect(newState.todos).toHaveLength(1)
    expect(newState.todos[0]).toEqual(todo)
  })

  test('should update a todo-status successfully', () => {
    const todoId = shortid()
    const newStatus = TodoStatus.COMPLETED
    const initState: AppState = { 
      todos: [
        {
          id: shortid(),
          content: "New todo 2",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        },
        {
          id: todoId,
          content: "New todo 1",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        }
      ]
    }
    const newState = reducer(initState, updateTodoStatus(todoId, newStatus))
    expect(newState.todos[1].status).toBe(newStatus)
  })

  test('should update a todo successfully', () => {
    const todoId = shortid()
    const newContent = 'New todo test'
    const newStatus = TodoStatus.COMPLETED
    const initState: AppState = { 
      todos: [
        {
          id: shortid(),
          content: "New todo 2",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        },
        {
          id: todoId,
          content: "New todo 1",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        }
      ]
    }
    const newState = reducer(initState, updateTodo(todoId, { content: newContent, status: newStatus }))
    expect(newState.todos[1].status).toBe(newStatus)
    expect(newState.todos[1].content).toBe(newContent)
  })

  test('should delete a todo successfully', () => {
    const todoId = shortid()
    const initState: AppState = { 
      todos: [
        {
          id: todoId,
          content: "New todo 1",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        },
        {
          id: shortid(),
          content: "New todo 2",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        }
      ]
    }
    const newState = reducer(initState, deleteTodo(todoId))
    expect(newState.todos).toHaveLength(1)
    expect(newState.todos[0]).toEqual(initState.todos[1])
  })

  test('should delete all todo sucessfully', () => {
    const initState: AppState = { 
      todos: [
        {
          id: shortid(),
          content: "New todo 1",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        },
        {
          id: shortid(),
          content: "New todo 2",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        }
      ]
    }
    const newState = reducer(initState, deleteAllTodos())
    expect(newState.todos).toHaveLength(0)
  })

  test('should update all todo status to complete', () => {
    const newStatus = TodoStatus.COMPLETED
    const initState: AppState = { 
      todos: [
        {
          id: shortid(),
          content: "New todo 1",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        },
        {
          id: shortid(),
          content: "New todo 2",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.COMPLETED,
        }
      ]
    }
    const newState = reducer(initState, toggleAllTodos(newStatus))
    expect(newState.todos[0].status).toBe(newStatus)
    expect(newState.todos[1].status).toBe(newStatus)
  })

  test('should update all todo status to active', () => {
    const newStatus = TodoStatus.ACTIVE
    const initState: AppState = { 
      todos: [
        {
          id: shortid(),
          content: "New todo 1",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.ACTIVE,
        },
        {
          id: shortid(),
          content: "New todo 2",
          user_id: "newUser",
          created_date: new Date().toUTCString(),
          status: TodoStatus.COMPLETED,
        }
      ]
    }
    const newState = reducer(initState, toggleAllTodos(newStatus))
    expect(newState.todos[0].status).toBe(newStatus)
    expect(newState.todos[1].status).toBe(newStatus)
  })

})