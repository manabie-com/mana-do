import {Todo} from '../../../models/todo';
import {
  AppActions,
  todoAction
} from '../../actions';

export interface TodoState {
  todos: Array<Todo>
}

export const initialTodoState: TodoState = {
  todos: []
}

function todoReducer(state: TodoState, action: AppActions): TodoState {
  switch (action.type) {
    case todoAction.SET_TODO:
      return {
        ...state,
        todos: [...action.payload]
      }

    case todoAction.CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case todoAction.UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.todoId) {
            return {
              ...todo,
              status: action.payload.status
            }
          }
          return todo;
        })
      };

    case todoAction.UPDATE_TODO_CONTENT:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.todoId) {
            return {
              ...todo,
              content: action.payload.content
            }
          }
          return todo;
        })
      };

    case todoAction.TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload
        }
      })

      return {
        ...state,
        todos: tempTodos
      };

    case todoAction.DELETE_TODO:
      const todos = state.todos.filter(todo => todo.id !== action.payload);

      return {
        ...state,
        todos: [...todos]
      };

    case todoAction.DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }

    default:
      return state;

  }
}

export default todoReducer;
