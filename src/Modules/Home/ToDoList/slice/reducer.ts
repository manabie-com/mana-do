import {Todo, TodoStatus} from '../../../../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  INIT_TODO,
  INIT_TODO_DONE,
  TOGGLE_ALL_TODOS,
  UPDATE_IS_IMPORTANT,
  UPDATE_STATUS_SHOWING,
  UPDATE_TODO,
  UPDATE_TODO_STATUS
} from './actions';
import {MenuActive} from "../../../../components/molecules/Toolbar";
import {MAP_SHOWING_TO_ACTIVE_MENU} from "./constants";

export interface AppState {
  todos: Array<Todo>,
  isLoading: boolean,
  isInit: boolean,
  showing: TodoStatus,
  menuActive: MenuActive,
}

export const initialState: AppState = {
  todos: [],
  isLoading: true,
  isInit: false,
  showing: TodoStatus.ALL,
  menuActive: MenuActive.ALL,
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case INIT_TODO:
      return {
        ...state,
        isInit: false,
        isLoading: true
      };
    case INIT_TODO_DONE:
      return{
        ...state,
        todos: action.payload,
        isInit: true,
        isLoading: false
      }
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
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
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      const dataTmp = [...state.todos];
      dataTmp.splice(index1, 1);

      return {
        ...state,
        todos: dataTmp
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
        menuActive: MenuActive.CLEAR
      }

    case UPDATE_STATUS_SHOWING:
      return {
        ...state,
        showing: action.payload,
        menuActive: MAP_SHOWING_TO_ACTIVE_MENU[action.payload] as MenuActive
      }

    case UPDATE_IS_IMPORTANT:
      const {todoId, isImportant} = action.payload;
      const indexItemTodo = state.todos.findIndex((todo) => todo.id === todoId);
      const dataClone = [...state.todos];
      if(indexItemTodo !== -1){
        dataClone[indexItemTodo].is_important = isImportant
      }

      return {
        ...state,
        todos: dataClone
      }
    case UPDATE_TODO:
      const indexItem = state.todos.findIndex(todo => todo.id === action.payload.todoId);

      const todoClone = [...state.todos];

      if(indexItem !== -1){
        todoClone[indexItem].content = action.payload.content
      }

      return {
        ...state,
        todos: [...todoClone]
      }
    default:
      return state;
  }
}

export default reducer;