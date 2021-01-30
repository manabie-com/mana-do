import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  UPDATE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}
// localStorage.getItem('state') || 
export const initialState : AppState = JSON.parse(localStorage.getItem('state') || '') as AppState || {
  todos: []
};

function reducer(state: AppState, action: AppActions): AppState {
  const { todos = [] } = state;
  console.log(state);
  console.log(action.type);
  

  switch (action.type) {
    case CREATE_TODO: {
      // console.log(action.payload);
      const newTodo: Todo = action.payload;

      return {
        ...state,
        todos: [...state.todos, newTodo]
      };
    }

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      console.log(state.todos);
      console.log(action.payload.todoId);
      // state.todos[index2].status = action.payload.checked
      //   ? TodoStatus.COMPLETED
      //   : TodoStatus.ACTIVE;

      return {
        ...state
        // todos: state.todos
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        };
      });

      return {
        ...state,
        todos: tempTodos
      };

    case DELETE_TODO:
      console.log('HERE');
      
      
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos
      };

    case DELETE_ALL_TODOS: {
      console.log(state);
      
      return {
        ...state,
        todos: []
      };
    }
    case UPDATE_TODO: {
      const {
        payload: { todoId, content = '' }
      } = action;
      const { todos } = state;
      const currentIndex = todos.findIndex((todo) => todo.id === todoId);
      if (currentIndex === -1) {
        console.log(`Todo item's index not found`);
        return {
          ...state
        };
      }

      const todoList = todos;
      const updatedTodo = todos[currentIndex];
      updatedTodo.content = content;
      todoList.splice(currentIndex, 1, updatedTodo);

      return {
        ...state,
        todos: todoList
      };
    }
    default:
      return state;
  }
}

export default reducer;
