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
        todos: action.payload
      }

    case todoAction.CREATE_TODO:
      /*
        In React.StrictMode, functions passed to useReducer might be double-invoked in development build,
        and `state.todos` is an array which is the reference type,
        so if we do the push the `action.payload` to `state.todos`,
        `action.payload` will be pushed twice.
        Instead, we should set directly the `todos` to new array.
        This way, even though this action is double-invoked,
        but the current `state.todos` are the same,
        `[...state.todos, action.payload]` will be also the same,
        so the last `state.todos` will be the same with only 1 new `action.payload` pushed
       */
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case todoAction.UPDATE_TODO_STATUS:
      const updatedStatusTodo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (updatedStatusTodo) {
        updatedStatusTodo.status = action.payload.status;
      }
      return {
        ...state
      };

    case todoAction.UPDATE_TODO_CONTENT:
      const updatedContentTodo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (updatedContentTodo) {
        updatedContentTodo.content = action.payload.content;
      }
      return {
        ...state
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
