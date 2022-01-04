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
// define initial state when parameter is undefined
function reducer(state: AppState = initialState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO: 
      return {
        ...state,
        todos : action.payload
      }
    case CREATE_TODO:
      // In reducer, it does not allow to mutate the object directly.
      // We need to clone it and then modify it
      return {
        ...state,
        todos : [...state.todos,action.payload]
      };

    case UPDATE_TODO_STATUS:
      // Clone todos array to the new one to avoid mutating the old array
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      // check the todo exists or not
      if(index2 < 0)
        return state
      const todoList = [...state.todos]
      todoList[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      return {
        ...state,
        todos: todoList
      }
    case UPDATE_TODO_CONTENT:
      const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload.todoID);
      if(todoIndex < 0)
        return state
      const todoList2 = [...state.todos]
      todoList2[todoIndex].content = action.payload.todoContent

      return {
        ...state,
        todos: todoList2
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
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      if(index1 < 0)
        return state
      // Clone todos array, then remove the item
      const newTodos = [...state.todos]
      newTodos.splice(index1,1)
      return {
        ...state,
        todos: newTodos
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;