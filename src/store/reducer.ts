import { Todo, TodoStatus } from '../models/todo';
import { LOCAL_TODOS } from '../utils/contants';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODOS,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_FILTER,
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: {
      state.todos.push(action.payload);

      const localTodos = JSON.parse(localStorage.getItem(LOCAL_TODOS) as string) as Array<Todo>
      localTodos.push(action.payload);
      localStorage.setItem(LOCAL_TODOS, JSON.stringify(localTodos))
      return {
        ...state
      };
    }
    case UPDATE_TODO_STATUS: {
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      const localTodos = JSON.parse(localStorage.getItem(LOCAL_TODOS) as string) as Array<Todo>
      const idsLocal = localTodos.findIndex((todo) => todo.id === action.payload.todoId)
      localTodos[idsLocal].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      localStorage.setItem(LOCAL_TODOS, JSON.stringify(localTodos))

      return {
        ...state,
        todos: state.todos
      }
    }
    case TOGGLE_ALL_TODOS:
      const tempTodos: Array<Todo> = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      const localTodos = JSON.parse(localStorage.getItem(LOCAL_TODOS) as string) as Array<Todo>
      const arrIdTempTodos = tempTodos.reduce((result: Array<any>, todo) => {
        result.push(todo.id)
        return result
      }, [])

      localTodos.map((todo) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        arrIdTempTodos.includes(todo.id) ? (action.payload ? todo.status = TodoStatus.COMPLETED : todo.status = TodoStatus.ACTIVE) : null
        return todo
      })

      localStorage.setItem(LOCAL_TODOS, JSON.stringify(localTodos))

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO: {
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);

      const localTodos = JSON.parse(localStorage.getItem(LOCAL_TODOS) as string) as Array<Todo>
      const idsLocal = localTodos.findIndex((todo) => todo.id === action.payload)
      localTodos.splice(idsLocal, 1);

      localStorage.setItem(LOCAL_TODOS, JSON.stringify(localTodos))

      return {
        ...state,
        todos: state.todos
      }
    }
    case DELETE_ALL_TODOS: {
      const localTodos = JSON.parse(localStorage.getItem(LOCAL_TODOS) as string) as Array<Todo>
      const arrStateTodos = state.todos.reduce((result: Array<any>, todo) => {
        result.push(todo.id)
        return result
      }, [])

      localStorage.setItem(LOCAL_TODOS, JSON.stringify(localTodos.filter((todo) => !arrStateTodos.includes(todo.id))))
      return {
        ...state,
        todos: []
      }
    }
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload
      }
    case UPDATE_FILTER:
      const oldTodos = JSON.parse(localStorage.getItem(LOCAL_TODOS) as string) as Array<Todo>
      let newTodos = oldTodos;

      if (action.payload !== 'ALL') {
        newTodos = oldTodos.filter((todo: any) => todo.status === action.payload)
      }

      return {
        ...state,
        todos: (newTodos && typeof newTodos === 'object') ? [...newTodos] : []
      }
    default:
      return state;
  }
}

export default reducer;