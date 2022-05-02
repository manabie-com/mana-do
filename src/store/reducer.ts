import {Todo, TodoStatus} from '../types/types';
import {
  AppActions,
} from './types';

import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  EDIT_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './constants';
import { AppState } from './types';
import { setToDoList, getToDoList } from '../utils/utils';

export const initialState: AppState = {
  todos: getToDoList(), // get data from local storage, it returns empty array by default
};

const reducer = (state: AppState, action: AppActions): AppState => {
  let todos: Todo[] = [];
  let tempTodos: Todo[] = [];
  let newTodoList: Todo[] = [];

  switch (action.type) {
    case CREATE_TODO:
      todos = [...state.todos, action.payload];
      setToDoList(JSON.stringify(todos)); // set todos in local storage. - convert array to string since localStorage only store string values.
      return {
        ...state,
        todos // add todos here to update the view.
      };

    case EDIT_TODO:
      console.log(action.payload);
      todos = getToDoList();
      const { todoId, todoContent } = action.payload;
      newTodoList = todos.map((todo) => {
        if (todo.id === todoId) todo.content = todoContent; // update todo status here by comparing todo id and selected todo id.
        return todo;
      });
      setToDoList(JSON.stringify(newTodoList));
      return {
        ...state,
        todos: newTodoList
      };

    case UPDATE_TODO_STATUS:
      todos = getToDoList(); // get todo list from local storage.
      newTodoList = todos.map((todo) => {
        if (todo.id === action.payload.todoId) todo.status =  action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE; // update todo status here by comparing todo id and selected todo id.
        return todo;
      }); // It will return a new array of todo list with update status.
      setToDoList(JSON.stringify(newTodoList)); // set new todo list after updating the todo status.
      return {
        ...state,
        todos: newTodoList // set new todo list here to update the view.
      }

    case TOGGLE_ALL_TODOS:
      todos = getToDoList(); // get todos from localStorage
      tempTodos = todos.map((todo) => {
        return {
          ...todo,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE // update todo status
        }
      });
      setToDoList(JSON.stringify(tempTodos)); // set new todo list in localStorage - store todos with updated status
      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      todos = getToDoList();
      tempTodos = todos.filter((todo) => todo.id !== action.payload); // filter all records that are not equal to selected todo id.
      setToDoList(JSON.stringify(tempTodos));
      return {
        ...state,
        todos: tempTodos
      }
    case DELETE_ALL_TODOS:
      setToDoList('[]');
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;