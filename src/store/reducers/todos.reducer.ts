import { Store } from './root.reducer';
import { Todo } from '../../models/todo';
import { TodoActions } from '../actions';

export interface TodosState {
  items: Todo[];
}

export const initialState: TodosState = {
  items: [],
};

export function todosReducer(state: TodosState = initialState, action: TodoActions): TodosState {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        items: action.payload,
      };

    case 'CREATE_TODO':
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'UPDATE_TODO_STATUS': {
      const toBeUpdatedTodoIndex = state.items.findIndex((todo) => todo.id === action.payload.todoId);

      const updatedTodo: Todo = { ...state.items[toBeUpdatedTodoIndex], status: action.payload.status };

      return {
        ...state,
        items: [
          ...state.items.slice(0, toBeUpdatedTodoIndex),
          updatedTodo,
          ...state.items.slice(toBeUpdatedTodoIndex + 1),
        ],
      };
    }

    case 'UPDATE_ALL_TODOS_STATUS': {
      const tempTodos = state.items.map((todo) => {
        return {
          ...todo,
          status: action.payload,
        };
      });

      return {
        ...state,
        items: tempTodos,
      };
    }

    case 'DELETE_TODO': {
      const toBeDeletedTodoIndex = state.items.findIndex((todo) => todo.id === action.payload);
      const remainingTodos = [
        ...state.items.slice(0, toBeDeletedTodoIndex),
        ...state.items.slice(toBeDeletedTodoIndex + 1),
      ];

      return {
        ...state,
        items: remainingTodos,
      };
    }

    case 'DELETE_ALL_TODOS':
      return {
        ...state,
        items: [],
      };

    case 'UPDATE_TODO_CONTENT': {
      const toBeUpdatedTodoIndex = state.items.findIndex((todo) => todo.id === action.payload.todoId);

      const updatedTodo: Todo = { ...state.items[toBeUpdatedTodoIndex], content: action.payload.content };

      return {
        ...state,
        items: [
          ...state.items.slice(0, toBeUpdatedTodoIndex),
          updatedTodo,
          ...state.items.slice(toBeUpdatedTodoIndex + 1),
        ],
      };
    }
    default:
      return state;
  }
}

export const todosSelector = (state: Store) => state.todos.items;
