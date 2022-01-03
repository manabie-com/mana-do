import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
  CHANGE_TODO_MODE,
  SET_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  let newState;
  let newTodoList;
  let updatingTodoIndex;
  const saveLocal = (state: AppState): void => {
    window.localStorage.setItem('state', JSON.stringify(state))
  }
  switch (action.type) {
    case SET_TODO:
      newState = {...state, todos: action.payload}
      break

    case CREATE_TODO:
      // state.todos.push(action.payload);
      // return {
      //     ...state
      //   }
      newState = { ...state, todos: [...state.todos, action.payload] };
      break

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      // return {
      //   ...state,
      //   todos: state.todos
      // }
      newState = { ...state, todos: state.todos };
      break

    case UPDATE_TODO_CONTENT: 
      updatingTodoIndex = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      newTodoList = [...state.todos];
      newTodoList[updatingTodoIndex].content = action.payload.content;
      newState = {...state, todos: newTodoList};
      break

    case CHANGE_TODO_MODE:
      updatingTodoIndex = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      newTodoList = [...state.todos];
      newTodoList[updatingTodoIndex].isEditing = action.payload.isEditing;

      newState = {...state, todos: newTodoList};
      return newState;

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      // return {
      //   ...state,
      //   todos: tempTodos
      // }
      newState = { ...state, todos: tempTodos }
      break

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      // state.todos.splice(index1, 1);
      // return {
      //   ...state,
      //   todos: state.todos
      // }
      newTodoList = [...state.todos]
      newTodoList.splice(index1, 1)
      newState = { ...state, todos: newTodoList }
      break
    
    case DELETE_ALL_TODOS:
      // return {
      //   ...state,
      //   todos: []
      // }
      newState = {...state, todos: []}
      break
    default:
      return state;
    }

  saveLocal(newState);
  return newState;
}

export default reducer;