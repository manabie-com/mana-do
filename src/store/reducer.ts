import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  EDIT_TODO_CONTENT,
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
    case SET_TODO:
      return { ...state, todos: action.payload }
    case CREATE_TODO:
      const index = state.todos.findIndex((todo) => todo.content === action.payload.content || todo.id === action.payload.id)
      //neu index bang -1 la khong tim thay content trung se them vao todos
      if (index === -1) {
        state.todos.push(action.payload);
        localStorage.setItem("localTodos", JSON.stringify(state.todos));
      }
      else {
        alert("You have aldready added it!")
      }
      return {
        ...state
      };
    case EDIT_TODO_CONTENT:

      const newTodo = [...state.todos]
      const indexUpdate = state.todos.findIndex((todo) => {
        return todo.id === action.payload.todoId
      })

      if (indexUpdate !== -1) {
        newTodo[indexUpdate].content = action.payload.content
        localStorage.setItem("localTodos", JSON.stringify(state.todos))
        alert("Cập nhật thành công!")
      }

      return { ...state }

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos
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
      const todoFilter = state.todos.filter((todo) => { return todo.id !== action.payload })
      console.log(todoFilter);

      // mang sau khi filter da loc bo phan tu can xoa
      localStorage.setItem("localTodos", JSON.stringify(todoFilter))
      return {
        ...state, todos: todoFilter
      }
    case DELETE_ALL_TODOS:
      state.todos = []
      localStorage.setItem("localTodos", JSON.stringify(state.todos))
      return {
        ...state
      }
    default:
      return state;
  }
}

export default reducer;