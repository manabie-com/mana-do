import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  EDIT_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };

    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      }

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const resultDeleteTodo = state.todos.filter(todo => todo.id !== action.payload)
      localStorage.setItem('todoList', JSON.stringify(resultDeleteTodo))

      return {
        ...state,
        todos: resultDeleteTodo
      }
    case DELETE_ALL_TODOS:
      const todoEmpty:Todo[] = []
      localStorage.setItem('todoList', JSON.stringify(todoEmpty))
      return {
        ...state,
        todos: todoEmpty
      }

    case EDIT_TODO:
      const resultEditTodo = state.todos.map(todo =>
          todo.id === action.payload.todoId ? { ...todo, content: action.payload.content} : todo
      )
      localStorage.setItem('todoList', JSON.stringify(resultEditTodo))

      return {
        ...state,
        todos: resultEditTodo
      }

    default:
      return state;
  }
}

export default reducer;