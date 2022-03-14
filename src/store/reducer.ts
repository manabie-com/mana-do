import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

const saveToLocalStorage = (state: AppState) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

export const loadFromLocalStorage = (item: string): AppState | undefined => {
  try {
    const stateStr = localStorage.getItem(item);
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const reducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case CREATE_TODO:

      // Should not use push method because with React.strictmode , react will call reducer twice to make any unexpected side effects more apparent
      // So when react call twice reducer will push 2 item to todo list although it is dispatched once
      // state.todos.push(action.payload);

      //so i use spread operator to merge newTodo to todo list. It will not append to to do list if existed
      const newTodos: Array<Todo> = [...state.todos, action.payload]
      const newState: AppState = { ...state, todos: newTodos }
      saveToLocalStorage(newState)
      return newState;

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);

      if (index2 < 0) {
        return { ...state }
      }

      // clone to new array because mutate state will create some issues we can not predict
      const newTodosUpdatedStatus: Array<Todo> = state.todos.slice();
      const payload: Todo = { ...action.payload.todo }
      newTodosUpdatedStatus[index2] = payload

      const newStateUpdated: AppState = { ...state, todos: newTodosUpdatedStatus }

      saveToLocalStorage(newStateUpdated);
      return newStateUpdated

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      const newStateToggleAllTodos: AppState = { ...state, todos: tempTodos }
      saveToLocalStorage(newStateToggleAllTodos)
      return newStateToggleAllTodos

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      // if todo not found, do nothing
      if (index1 < 0) {
        return { ...state }
      }

      // clone to new array because mutate state will create some issues we can not predict
      const newTodosDeleted: Array<Todo> = state.todos.slice();
      newTodosDeleted.splice(index1, 1)

      const newStateTodoDeleted: AppState = { ...state, todos: newTodosDeleted }
      saveToLocalStorage(newStateTodoDeleted)
      return newStateTodoDeleted

    case DELETE_ALL_TODOS:
      saveToLocalStorage({ ...state, todos: [] })
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }

}

export default reducer;