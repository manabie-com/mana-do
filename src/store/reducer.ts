import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    // Clone todo list data
    case SET_TODO:
      state.todos = action.payload
      return {
        ...state
      };
    case CREATE_TODO:
      state.todos.push(action.payload);
      // Update Local Storage
      localStorage.setItem("myTodo", JSON.stringify(state.todos));
      return {
        ...state
      };
    // Implement edit action
    case UPDATE_TODO:
      let listUpdate = [...state.todos]
      let index1 = listUpdate.findIndex((todo)=> todo.id === action.payload.todoId);
      if (index1 !== -1){
        listUpdate[index1].content = action.payload.data
      }
      state.todos = listUpdate
      // Update Local Storage
      localStorage.setItem("myTodo", JSON.stringify(state.todos));
      return {
        ...state
      };
      
    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      // Update Local Storage
      localStorage.setItem("myTodo", JSON.stringify(state.todos));
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
      state.todos = tempTodos;
      // Update Local Storage
      localStorage.setItem("myTodo", JSON.stringify(state.todos));
      return {
        ...state,
      }

    case DELETE_TODO:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index3, 1);
      // Update Local Storage
      localStorage.setItem("myTodo", JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      state.todos = [];
      // Update Local Storage
      localStorage.setItem("myTodo", JSON.stringify(state.todos));
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default reducer;