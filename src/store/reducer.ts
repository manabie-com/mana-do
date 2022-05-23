import {Todo, TodoStatus} from '../models/todo';
import { setLocalStorage, getLocalStorage } from '../utils';
import {
  AppActions,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: getLocalStorage('manabie-todos') ? getLocalStorage('manabie-todos') :  []
} 

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      if(action.payload.content)
      {
        state.todos.push(action.payload);
        setLocalStorage('manabie-todos',state.todos);
      }
      return {
        ...state
      };

    case UPDATE_TODO:
    const index2 = state.todos.findIndex((todo) => todo.id === action.todoId);  
      state.todos[index2] = action.payload;
      setLocalStorage('manabie-todos',state.todos);
      return {
        ...state,
        todos: state.todos
      }

    case UPDATE_TODO_STATUS:
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);    
      state.todos[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      setLocalStorage('manabie-todos',state.todos);
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
      setLocalStorage('manabie-todos',tempTodos);
      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);
      setLocalStorage('manabie-todos',state.todos);

      return {
        ...state,
        todos: state.todos
      }

    case DELETE_ALL_TODOS:
      setLocalStorage('manabie-todos',[]);
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;