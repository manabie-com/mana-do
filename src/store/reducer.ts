import { Todo, TodoStatus } from '../models/todo';
import { AppActions } from './actions';
import { CREATE_TODO, DELETE_TODO, DELETE_ALL_TODOS, TOGGLE_ALL_TODOS, UPDATE_TODO_STATUS, UPDATE_TODO_CONTENT } from "./constant"
import { AppState } from './interface';

const todoList = localStorage.getItem("todos")
export const initialState: AppState = {
  todos: todoList ? JSON.parse(todoList)?.todos : []
}

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify({ todos }));
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      const updatedTodo = state.todos.concat(action.payload)
      saveTodos(updatedTodo)
      return {
        ...state,
        todos: updatedTodo
      };

    case UPDATE_TODO_CONTENT:
      let editedTodos = [...state.todos];
      const existedEditIndex = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const existedEditTodo = state.todos[existedEditIndex]
      if (existedEditTodo) {
        const updatedItem = { ...existedEditTodo, content: action.payload.content }
        editedTodos[existedEditIndex] = updatedItem
      }
      saveTodos(editedTodos)
      return {
        ...state,
        todos: editedTodos
      }

    case UPDATE_TODO_STATUS:
      let updatedTodos = [...state.todos];
      const existedTodoIndex = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const existedTodo = state.todos[existedTodoIndex]
      if (existedTodo) {
        const updatedItem = { ...existedTodo, status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE }
        updatedTodos[existedTodoIndex] = updatedItem
      }
      saveTodos(updatedTodos)
      return {
        ...state,
        todos: updatedTodos
      }


    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos?.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      saveTodos(tempTodos)
      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const filteredTodos = state.todos?.filter(todo => todo.id !== action.payload)
      saveTodos(filteredTodos)
      return {
        ...state,
        todos: filteredTodos
      }

    case DELETE_ALL_TODOS:
      localStorage.clear()
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;