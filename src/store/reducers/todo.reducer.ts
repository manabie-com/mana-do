import { Todo } from '../../models/todo';
import { TodoActions } from '../actions/';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};

export function todosReducer(state: TodoState = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    case 'CREATE_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'UPDATE_TODO_STATUS': {
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? 'COMPLETED' : 'ACTIVE';

      return {
        ...state,
        todos: state.todos,
      };
    }

    case 'UPDATE_ALL_TODOS_STATUS': {
      const tempTodos = state.todos.map((todo) => {
        return {
          ...todo,
          status: action.payload,
        };
      });

      return {
        ...state,
        todos: tempTodos,
      };
    }

    case 'DELETE_TODO': {
      const toBeDeletedTodoIndex = state.todos.findIndex((todo) => todo.id === action.payload);
      const remainingTodos = [
        ...state.todos.slice(0, toBeDeletedTodoIndex),
        ...state.todos.slice(toBeDeletedTodoIndex + 1),
      ];

      return {
        ...state,
        todos: remainingTodos,
      };
    }

    case 'DELETE_ALL_TODOS':
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
}
