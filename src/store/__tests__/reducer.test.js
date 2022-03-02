import reducer from '../reducer'
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoContent,
  updateTodoStatus
} from '../actions'
import { TodoStatus } from '../../models/todo'

const todo1 = {
  content: 'Content 1',
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: '230297-axa',
  user_id: 'firstUser'
}

const todo2 = {
  content: 'Content 2',
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: '230297-axb',
  user_id: 'firstUser'
}

describe('Test reducer of Todo', () => {
  it('set todo', () => {
    let listTodo = reducer({ todos: [] }, setTodos([todo1, todo2]))
    expect(listTodo).toEqual(expect.objectContaining({ todos: [todo1, todo2] }))
  })

  it('create todo', () => {
    let listTodo = reducer({ todos: [todo1] }, createTodo(todo2))
    expect(listTodo).toEqual(expect.objectContaining({ todos: [todo2, todo1] }))
  })

  describe('update todo status', () => {
    it('if todo no existed', () => {
      let listTodo = reducer(
        { todos: [todo1] },
        updateTodoStatus('230297-axc', true)
      )
      expect(listTodo).toEqual(expect.objectContaining({ todos: [todo1] }))
    })
    it('if todo existed', () => {
      let listTodo = reducer(
        { todos: [todo1, todo2] },
        updateTodoStatus('230297-axb', true)
      )
      const todo3 = { ...todo2, status: TodoStatus.COMPLETED }
      expect(listTodo).toEqual(
        expect.objectContaining({ todos: [todo1, todo3] })
      )
    })
  })

  describe('update todo content', () => {
    it('if todo no existed', () => {
      let listTodo = reducer(
        { todos: [todo1] },
        updateTodoContent('230297-axc', 'Edited content')
      )
      expect(listTodo).toEqual(expect.objectContaining({ todos: [todo1] }))
    })
    it('if todo existed', () => {
      let listTodo = reducer(
        { todos: [todo1, todo2] },
        updateTodoContent('230297-axb', 'Edited content')
      )
      const todo3 = { ...todo2, content: 'Edited content' }
      expect(listTodo).toEqual(
        expect.objectContaining({ todos: [todo1, todo3] })
      )
    })
  })

  describe('toggle all todos', () => {
    it('toggle all to COMPLETE', () => {
      let listTodo = reducer({ todos: [todo1, todo2] }, toggleAllTodos(true))
      const completeTodos = [todo1, todo2].map((todo) => {
        return { ...todo, status: TodoStatus.COMPLETED }
      })
      expect(listTodo).toEqual(
        expect.objectContaining({ todos: completeTodos })
      )
    })
    it('toggle all to ACTIVE', () => {
      let listTodo = reducer({ todos: [todo1, todo2] }, toggleAllTodos(false))
      const activeTodos = [todo1, todo2].map((todo) => {
        return { ...todo, status: TodoStatus.ACTIVE }
      })
      expect(listTodo).toEqual(expect.objectContaining({ todos: activeTodos }))
    })
  })

  it('delete todo', () => {
    let listTodo = reducer({ todos: [todo1, todo2] }, deleteTodo('230297-axb'))
    expect(listTodo).toEqual(expect.objectContaining({ todos: [todo1] }))
  })

  it('delete all todos', () => {
    let listTodo = reducer({ todos: [todo1, todo2] }, deleteAllTodos())
    expect(listTodo).toEqual(expect.objectContaining({ todos: [] }))
  })
})
