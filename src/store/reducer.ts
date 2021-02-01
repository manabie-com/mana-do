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

// Not good when storing a large amount of data in localStorage

// export const initialState: AppState = (JSON.parse(
//   localStorage.getItem('state') || '{todos: []}'
// ) as AppState) || {
//   todos: []
// };
// if (!localStorage.getItem('state')) {
//   localStorage.setItem('state', '{todos: []}');
// }
console.log(JSON.parse(localStorage.getItem('todos') || ''));

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem('todos') || '') || []
};

function reducer(state: AppState, action: AppActions): AppState {
  const { todos = [] } = state;
  console.log(state);
  console.log(action.type);

  switch (action.type) {
    case CREATE_TODO: {
      const newTodo: Todo = action.payload;

      return {
        ...state,
        todos: [...state.todos, newTodo]
      };
    }

    case UPDATE_TODO_STATUS: {
      const newTodos = [...state.todos];
      const index = newTodos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      console.log(newTodos);
      console.log(action.payload.todoId);
      newTodos[index].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: newTodos
      };
    }

    case TOGGLE_ALL_TODOS:
      const tempTodos = [...state.todos].map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        };
      });

      return {
        ...state,
        todos: tempTodos
      };

    case DELETE_TODO: {
      console.log('HERE');

      const newTodos: Todo[] = [...state.todos];
      const index: number = newTodos.findIndex(
        (todo) => todo.id === action.payload
      );
      newTodos.splice(index, 1);

      console.log([...state.todos]);

      console.log(newTodos);

      return {
        ...state,
        // todos: [...state.todos]
        // todos: [...newTodos]
        todos: newTodos
      };
    }

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
