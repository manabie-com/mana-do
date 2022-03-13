import produce from 'immer';
import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: [],
}

export default function toDoReducer(state = initialState, action: AppActions) {
  switch (action.type) {
    case CREATE_TODO:
      return produce(state, (draft) => {
        draft.todos.push(action.payload)
      })

    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: produce(state.todos, (draft) => {
          const index = draft.findIndex((todo) => todo.id === action.payload.todoId)
          draft[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        })
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
      return {
        ...state,
        todos: produce(state.todos, (draft) => {
          const index = draft.findIndex(todo => todo.id === action.payload)
          draft.splice(index, 1)
        })
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case UPDATE_TODO:
      return {
        ...state,
        todos: produce(state.todos, (draft) => {
          const index = draft.findIndex((todo) => todo.id === action.payload.id)
          if (index >= 0) {
            draft[index].content = action.payload.content
          }
        })
      };
    default:
      return state;
  }
}
