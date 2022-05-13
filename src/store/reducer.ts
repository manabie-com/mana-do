import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
  SET_TODO,
  TODO_ACTIVE,
  TODO_COMPLETE,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}
const storeData = (todos: any) => window.localStorage.setItem("mana-todo", JSON.stringify(todos));

export const initialState: AppState = {
  todos: [],
};
const todo = JSON.parse(window.localStorage.getItem("mana-todo") || "");

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    
    case SET_TODO:
      return { ...state, todos: todo };

    case CREATE_TODO:
      const newTodo = [...state.todos, action.payload];
      window.localStorage.setItem("mana-todo", JSON.stringify(newTodo));
      return {
        ...state,
        todos: newTodo,
      };

    case UPDATE_TODO_STATUS:
      let checkedTodo = state.todos.map((td) => {
        if (td.id === action.payload.todoId) {
          return {
            ...td,
            status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
          };
        } else {
          return td;
        }
      });
      storeData(checkedTodo);
      return {
        ...state,
        todos: checkedTodo,
      };
    
    case UPDATE_TODO:
      const contentTodo = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          return { ...todo, content: action.payload.value };
        } else {
          return todo;
        }
      });
      storeData(contentTodo);
      return {
        ...state,
        todos: contentTodo,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });
      storeData(tempTodos);
      
      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      let deleteTodo = state.todos.filter((td) => td.id !== action.payload);
      storeData(deleteTodo);

      return {
        ...state,
        todos: deleteTodo,
      };
    
    case DELETE_ALL_TODOS:
      storeData([]);
      return {
        ...state,
        todos: [],
      };
    
    case TODO_ACTIVE:
      let activeTodo = todo.filter((todoAct: any) => todoAct.status === action.payload);
      
      return {
        ...state,
        todos: activeTodo,
      };
    
    case TODO_COMPLETE:
      let completeTodo = todo.filter((td: any) => td.status === action.payload);
      
      return {
        ...state,
        todos: completeTodo,
      };
    
    default:
      return state;
  }
}

export default reducer;
