import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem('todolist') || '[]')
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      localStorage.setItem('todolist', JSON.stringify(action.payload));
      return {
        ...state,
        todos: action.payload
      };
      
    case CREATE_TODO:
      state.todos.push(action.payload);
      let getState = state.todos;
      state.todos = getState.filter((ele, ind) => ind === getState.findIndex( elem => elem.id === ele.id))
      localStorage.setItem('todolist', JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos
      };

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
      state.todos = state.todos.filter(el => {
        return el.id !== action.payload
      });
      localStorage.setItem('todolist', JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      state.todos = [];
      localStorage.setItem('todolist', JSON.stringify(state.todos));
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;