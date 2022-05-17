import { ITodoItem  } from './../models/todo';
import { TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  MODIFY_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  UPDATE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todoList: ITodoItem[]
}

export const initialState: AppState = {
  todoList: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: 
      const checkExistItem = state.todoList.find(item => item.id === action.payload.id);
      //Reducer auto call 2 time when we add item from second
      if(typeof checkExistItem === 'undefined') {
        console.log("item is undefined", checkExistItem);
        state.todoList.push(action.payload);
      } else {
        console.log("item is not undefined", checkExistItem);
      }
      return {...state};

    case MODIFY_TODO:
    
      localStorage.clear();
      const modifyItemIndex = state.todoList.findIndex((todo) => todo.id === action.payload.id);
      
      state.todoList[modifyItemIndex].content       = action.payload.content;
      state.todoList[modifyItemIndex].created_date  = action.payload.created_date;

      localStorage.setItem("todoItem", JSON.stringify(state.todoList));

      return {
        ...state,
        todoList: state.todoList
      }

    case UPDATE_TODO_STATUS:

      const todoStatusIndex = state.todoList.findIndex((todo) => todo.id === action.payload.todoId);
      localStorage.clear();
      state.todoList[todoStatusIndex].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem("todoItem", JSON.stringify(state.todoList));

    return {
      ...state,
      todoList: state.todoList
    }
  
    case UPDATE_ALL_TODOS:
      
      localStorage.clear();
      const tempTodos = state.todoList.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      localStorage.setItem("todoItem", JSON.stringify(state.todoList));
      return {
        ...state,
        todoList: tempTodos
      }

    case DELETE_TODO:
      const index1 = state.todoList.findIndex((todo) => todo.id === action.payload);
      console.log("deleted Item:", index1);
      localStorage.clear();
      if (index1 !== -1) {
        state.todoList.splice(index1, 1);
      }
      localStorage.setItem("todoItem", JSON.stringify(state.todoList));
      return {
        ...state,
        todoList: state.todoList
      }
    case DELETE_ALL_TODOS:
      localStorage.clear();
      state.todoList = JSON.parse(localStorage.getItem("todoItem") || '[]');
      localStorage.setItem("todoItem", JSON.stringify(state.todoList));
      return {
        ...state,
        todoList: []
      }
    default:
      state.todoList = action.payload;
      console.log("reload todo list in reducer:", state);
      return state;
  }
}

export default reducer;