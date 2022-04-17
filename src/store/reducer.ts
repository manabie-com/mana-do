import {
  addLocalItem,
  LocalStorageKeys,
  removeLocalItem
} from '../helpers/local-storage'
import { Todo, TodoStatus } from '../models/todo'
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_COMPLETED_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS
} from './actions'

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

const saveTodoList = (todos: Todo[]): void => {
  if (todos.length === 0) {
    removeLocalItem(LocalStorageKeys.todoKey)
  } else {
    addLocalItem(LocalStorageKeys.todoKey, JSON.stringify(todos))
  }
}

function reducer(state: AppState, action: AppActions): AppState {
  let newTodos = [],
    todoClone = [...state.todos],
    currentIndex
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      }
    case CREATE_TODO:
      /**
       * Should be return new state instead push todo into old state
       */
      newTodos = [action.payload, ...todoClone]
      saveTodoList(newTodos)
      return {
        ...state,
        todos: newTodos
      }

    case UPDATE_TODO_STATUS:
      /**
       * index2 for what?
       * should be use clear naming as currentIndex/todoIndex
       */
      currentIndex = todoClone.findIndex(
        (todo) => todo.id === action.payload.todoId
      )
      todoClone[currentIndex].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE
      saveTodoList(todoClone)
      return {
        ...state,
        todos: todoClone
      }

    case UPDATE_TODO_CONTENT:
      currentIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      )
      todoClone[currentIndex].content = action.payload.content
      saveTodoList(todoClone)
      return {
        ...state,
        todos: todoClone
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      saveTodoList(tempTodos)
      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      /**
       * index1 for what?
       * I try to use a simple way that filters all of the items that are not equal to the current id of todo
       */
      newTodos = todoClone.filter((todo) => todo.id !== action.payload)
      saveTodoList(newTodos)
      return {
        ...state,
        todos: newTodos
      }
    case DELETE_ALL_TODOS:
      saveTodoList([])
      return {
        ...state,
        todos: []
      }
    case DELETE_COMPLETED_TODOS:
      newTodos = todoClone.filter(
        (todo) => todo.status !== TodoStatus.COMPLETED
      )
      saveTodoList(newTodos)
      return {
        ...state,
        todos: newTodos
      }
    default:
      return state
  }
}

export default reducer
