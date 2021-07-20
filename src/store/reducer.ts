import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  EDIT_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

// I use this function to update state in localstorage so when we refresh todo will not be disappear
const keepTodosState = (state: AppState) => {
  localStorage.setItem("state", JSON.stringify(state));
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      // clone into a new array to prevent duplicating
      let newTodos = [...state.todos]
      newTodos.push(action.payload)
      state = {
        ...state,
        todos: newTodos
      }
      keepTodosState(state)
      return state;

    //setTodos get state from local storage
    case SET_TODO:
      return {
        ...state,
        todos: JSON.parse(localStorage.getItem("state")!).todos 
      }

    case EDIT_TODO:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index3].content = action.payload.content
      keepTodosState(state)
      return {
        ...state,
        todos: state.todos
      }


    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      keepTodosState(state)
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
      state = {
        ...state,
        todos: tempTodos
      }
      keepTodosState(state)
      return state

    case DELETE_TODO:
      let newTodos1 = [...state.todos]
      const index1 = newTodos1.findIndex((todo) => todo.id === action.payload);
      newTodos1.splice(index1, 1);
      state = {
        ...state,
        todos: newTodos1
      }
      keepTodosState(state)
      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      state = {
        ...state,
        todos: []
      }
      keepTodosState(state)
      return state
    default:
      return state;
  }
}

export default reducer;