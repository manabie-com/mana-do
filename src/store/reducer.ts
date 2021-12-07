import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return { ...state, todos: action.payload }

    case CREATE_TODO:
      // Don't modify directly the current state in reducer
      const todoData = [...state.todos, action.payload]
      localStorage.setItem('todos', JSON.stringify(todoData))
      return { ...state, todos: todoData }

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const updatedTodo = state.todos.map((todo, index) => {
        if (index !== index2) return todo
        return {
          ...todo,
          status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      localStorage.setItem('todos', JSON.stringify(updatedTodo))
      return {
        ...state,
        todos: updatedTodo
      }

    case UPDATE_TODO_CONTENT:
      const position = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const newTodos = state.todos.map((todo, index) => {
        if (index !== position) return todo
        return {
          ...todo,
          content: action.payload.newTodo
        }
        
      })
      localStorage.setItem('todos', JSON.stringify(newTodos))
      return {
        ...state,
        todos: newTodos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      localStorage.setItem('todos', JSON.stringify(tempTodos))
      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(todos))
      return { ...state, todos }

    case DELETE_ALL_TODOS:
      localStorage.removeItem('todos')
      return {
        ...state,
        todos: []
      }

    default:
      return state;
  }
}

export default reducer;