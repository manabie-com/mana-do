import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
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
      // bug found: should keep the reducer as a pure function to avoid side effect
      // state.todos.push(action.payload);
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      // bug found: should keep the reducer as a pure function to avoid side effect
      // state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      const newTodoList = state.todos;
      newTodoList[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: newTodoList
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
      // const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      // bug found: should keep the reducer as a pure function to avoid side effect
      // state.todos.splice(index1, 1);
      const newTodos = state.todos.filter(todo => todo.id !== action.payload);

      return {
        ...state,
        todos: newTodos
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }

    case UPDATE_TODO_CONTENT:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.id);
      const newTodoList2 = state.todos;
      newTodoList2[index3].content = action.payload.content;
      newTodoList2[index3].updated_date = action.payload.updated_date;

      return {
        ...state,
        todos: newTodoList2
      }

    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      }
    default:
      return state;
  }
}

export default reducer;