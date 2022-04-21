import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  ACTIVE_ALL_TODOS,
  COMPLETE_ALL_TODOS,
  DELETE_ALL_TODOS,
  DELETE_TODO,
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

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      state.todos = action.payload;
      return {
        ...state
      };

    case CREATE_TODO:
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      // check duplicate id
      if(index === -1){
        state.todos.push(action.payload);
        localStorage.setItem('todo', JSON.stringify(state.todos));
      }
      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if(index2 !== -1){
        state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        localStorage.setItem('todo', JSON.stringify(state.todos));
      }
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
      localStorage.setItem('todo', JSON.stringify(tempTodos));
      return {
        ...state,
        todos: tempTodos
      }

    case ACTIVE_ALL_TODOS:
      const tempTodos2 = state.todos.map((e)=>{
        return {
          ...e,
          status: TodoStatus.ACTIVE
        }
      })
      localStorage.setItem('todo', JSON.stringify(tempTodos2));

      return {
        ...state,
        todos: tempTodos2
      }

    case COMPLETE_ALL_TODOS:
      const tempTodos3 = state.todos.map((e)=>{
        return {
          ...e,
          status: TodoStatus.COMPLETED
        }
      })
      localStorage.setItem('todo', JSON.stringify(tempTodos3));
      return {
        ...state,
        todos: tempTodos3
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      if(index1 !== -1){
        state.todos.splice(index1, 1);
        localStorage.setItem('todo', JSON.stringify(state.todos));
      }
      
      return {
        ...state,
        todos: state.todos
      }

    case DELETE_ALL_TODOS:
      localStorage.setItem('todo', JSON.stringify([]));
      return {
        ...state,
        todos: []
      }

    case EDIT_TODO:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if(index3 !== -1){
        state.todos[index3].content = action.payload.content;
        localStorage.setItem('todo', JSON.stringify(state.todos));
      }
      return {
        ...state,
        todos: state.todos
      }

    default:
      return state;
  }
}

export default reducer;