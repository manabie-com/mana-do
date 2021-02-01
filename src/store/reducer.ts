
import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  EDIT_CONTENT,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
      return {
        ...state,
      };
    case SET_TODO:
      return{
        ...state,
        todos: action.payload
      }
      

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(index1, 1);
      localStorage.setItem("todos", JSON.stringify(state.todos));

      return {
        ...state,
        todos: state.todos,
      };
    case DELETE_ALL_TODOS:
      localStorage.removeItem('todos');
      return {
        ...state,
        todos: [],
      };
      case EDIT_CONTENT:
        let newTodoTemp = action.payload;
        let todosTemp = state.todos;
        let editTodoTemp = todosTemp.find(todo => todo.id === newTodoTemp.todoId);
        let editTodo: any = {...editTodoTemp, content: newTodoTemp.content};
        let index = todosTemp.findIndex(todo => todo.id === newTodoTemp.todoId);
        state.todos[index] = editTodo;
        localStorage.setItem("todos", JSON.stringify(state.todos));
        return {
          ...state,
          todos: state.todos
        }
        
    default:
      return state;
  }
}

export default reducer;
