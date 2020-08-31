import { Todo } from '../../models/todo';
import { TodoActions } from '../actions/';

export interface TodoState {
  todos: { [key: string]: Todo };
}

export const initialState: TodoState = {
  todos: {},
};

export function todoReducer(state: TodoState = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case 'CREATE_TODO':
      state.todos.push(action.payload);
      return {
        ...state,
      };

    case 'UPDATE_TODO_STATUS': {
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? 'COMPLETED' : 'ACTIVE';

      return {
        ...state,
        todos: state.todos,
      };
    }

    case 'TOGGLE_ALL_TODOS': {
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? 'COMPLETED' : 'ACTIVE',
        };
      });

      return {
        ...state,
        todos: tempTodos,
      };
    }

    case 'DELETE_TODO': {
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos,
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
