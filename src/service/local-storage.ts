import { Todo } from '../models/todo'

const TODO_KEY = 'todo'
class LocalStorageService {

  _save(todoList: Todo[]) {
    localStorage.setItem(TODO_KEY, JSON.stringify(todoList))
  }

  getTodoList(): Todo[] {
    const todoListString = localStorage.getItem(TODO_KEY) || '[]'

    return JSON.parse(todoListString)
  }

  createTodoList(todo: Todo) {
    const todoList = this.getTodoList()
    todoList.unshift(todo)

    this._save(todoList)

    return todo
  }

  deleteTodoItem(todoId: string): Promise<void> {
    const todoList = this.getTodoList().filter(item => item.id !== todoId)

    this._save(todoList)
    return Promise.resolve()
  }

  clearTodoList(): Promise<void> {
    this._save([])
    return Promise.resolve()
  }

  updateTodoName(todo: Todo): Promise<void> {
    const todoList = this.getTodoList().map(item => {
      if (item.id === todo.id) return todo

      return item
    })

    this._save(todoList)

    return Promise.resolve()
  }

  updateTodoStatus(todoList: Todo[]): Promise<Todo[]> {
    const updateTodoList = this.getTodoList().map(todo => {
      const foundTodo = todoList.find(item => item.id === todo.id)
      return foundTodo || todo
    })

    this._save(updateTodoList)

    return Promise.resolve(todoList)
  }
}

export default new LocalStorageService()
