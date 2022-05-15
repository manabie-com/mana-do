import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_EDIT_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

const data = localStorage.getItem('todos');
export const initialState: AppState = {
  todos: data === null ? []: JSON.parse(data),
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      return {
        ...state
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
      state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case SET_EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          return {
            ...todo,
            isEdit: action.payload.isEdit
          }
        }
          return todo;
        })
      };
    case UPDATE_TODO_CONTENT: 
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index].content = action.payload.content;
      state.todos[index].isEdit = false;

      return {
        ...state,
        todos: state.todos
      }
    default:
      return state;
  }
}

export default reducer;