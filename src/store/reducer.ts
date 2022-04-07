import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  ON_CHANGE_DB
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  const { todos } = state
  switch (action.type) {
    case CREATE_TODO:
      const cloneArr = [...todos]
      const check = cloneArr.some(item => item.id === action.payload.id)
      if (action.payload.content === '' || check) return state
      cloneArr.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(cloneArr))
      return {
        ...state,
        todos: cloneArr,
      };

    case UPDATE_TODO_STATUS:
      const cloneUpdate = [...todos]
      const { todoId, checked } = action.payload
      const findIndex = cloneUpdate.findIndex((todo) => todo.id === todoId);
      if (findIndex === -1) return state
      cloneUpdate[findIndex].status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem("todos", JSON.stringify(cloneUpdate))
      return {
        ...state,
        todos: cloneUpdate
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
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
      const cloneArrDelete = [...todos]
      const newArr = cloneArrDelete.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(newArr))
      return {
        ...state,
        todos: newArr
      }
    case DELETE_ALL_TODOS:
      localStorage.setItem("todos", JSON.stringify([]))
      return {
        ...state,
        todos: []
      }
    case SET_TODO:
      let data = action.payload;
      if (data.length === 0) {
        data = JSON.parse(localStorage.getItem('todos') || "[]");
      }
      return {
        ...state,
        todos: data
      }

    case ON_CHANGE_DB:
      const cloneChangeDB = [...todos]
      const { id, value } = action.payload
      const findIndexDB = cloneChangeDB.findIndex((todo) => todo.id === id);
      if (findIndexDB === -1) return state
      cloneChangeDB[findIndexDB].content = value;
      localStorage.setItem("todos", JSON.stringify(cloneChangeDB))
      return {
        ...state,
        todos: cloneChangeDB
      }
    default:
      return state;
  }
}

export default reducer;