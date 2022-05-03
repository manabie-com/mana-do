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
  UPDATE_TODO_STATUS,
  FILTER_TODOS,
} from './constants';
import { AppState } from './types';
import { setToDoList, getToDoList } from '../utils/utils';

export const initialState: AppState = {
  todos: getToDoList(), // get data from local storage, it returns empty array by default
  filteredBy: 'ALL'
};

const reducer = (state: AppState, action: AppActions): AppState => {
  let todos: Todo[] = [];
  let tempTodos: Todo[] = [];
  let newTodoList: Todo[] = [];
  let filteredTodos: Todo[] = [];
  let updatedToDoList: Todo[] = [];

  switch (action.type) {
  case CREATE_TODO:
    todos = getToDoList();
    newTodoList = [...state.todos, action.payload];
    setToDoList(JSON.stringify(newTodoList)); // set todos in local storage. - convert array to string since localStorage only store string values.
    return {
      ...state,
      todos: newTodoList // add todos here to update the view.
    };

  case EDIT_TODO:
    filteredTodos = state.filteredBy !== 'ALL' ? [...state.todos] : getToDoList(); // get todo items based on the applied filter. filters are [ALL, ACTIVE, COMPLETED]
    const { todoId, todoContent } = action.payload; // get payloads that are need for editing the todo list.
    newTodoList = filteredTodos.map((todo) => {
      if (todo.id === todoId) todo.content = todoContent; // update todo status here by comparing todo id and selected todo id.
      return todo;
    });

    if (state.filteredBy !== 'ALL') { // this function aims to update the content of selected todo in the local storage. update the master record if there's a filter. this is to maintain the record in the local storage.
      todos = getToDoList();
      updatedToDoList = todos.map((todo) => {
        if (todo.id === todoId) todo.content = todoContent; // update todo status here by comparing todo id and selected todo id.
        return todo;
      });
      setToDoList(JSON.stringify(updatedToDoList)); // set new todo list when filter is applied.
    } else setToDoList(JSON.stringify(newTodoList)); // set new todo list after updating the todo status.

    return {
      ...state,
      todos: newTodoList
    };

  case UPDATE_TODO_STATUS:
    filteredTodos = state.filteredBy !== 'ALL' ? [...state.todos] : getToDoList(); // get todo items based on the applied filter. filters are [ALL, ACTIVE, COMPLETED]
    newTodoList = filteredTodos.map((todo) => {
      if (todo.id === action.payload.todoId) todo.status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE; // update todo status here by comparing todo id and selected todo id.
      return todo;
    }); // It will return a new array of todo list with update statuses. this will be used to show the filtered todo list on the view.

    if (state.filteredBy !== 'ALL') { // this function aims to update the selected todo statuses in the local storage. update the master record if there's a filter. this is to maintain the record in the local storage.
      todos = getToDoList();
      updatedToDoList = todos.map((todo) => {
        if (todo.id === action.payload.todoId) todo.status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE; // update todo status here by comparing todo id and selected todo id.
        return todo;
      });
      setToDoList(JSON.stringify(updatedToDoList)); // set new todo list when filter is applied.
    } else setToDoList(JSON.stringify(newTodoList)); // set new todo list after updating the todo status.

    return {
      ...state,
      todos: newTodoList // set new todo list here to update the view.
    };

  case TOGGLE_ALL_TODOS:
    filteredTodos = state.filteredBy !== 'ALL' ? [...state.todos] : getToDoList(); // get todo items based on the applied filter. filters are [ALL, ACTIVE, COMPLETED].
    tempTodos = filteredTodos.map((todo) => {
      return {
        ...todo,
        status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE // update todo status
      };
    });

    if (state.filteredBy !== 'ALL') { // this function aims to update all the statuses in the local storage. update the master record if there's a filter. this is to maintain the record in the local storage.
      todos = getToDoList();
      updatedToDoList = todos.map((todo) => {
        return {
          ...todo,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE // update todo status
        };
      });
      setToDoList(JSON.stringify(updatedToDoList)); // set new todo list when filter is applied.
    } else setToDoList(JSON.stringify(tempTodos)); // set new todo list after updating the todo status.

    return {
      ...state,
      todos: tempTodos
    };

  case DELETE_TODO:
    filteredTodos = state.filteredBy !== 'ALL' ? [...state.todos] : getToDoList(); // get todo items based on the applied filter. filters are [ALL, ACTIVE, COMPLETED].
    tempTodos = filteredTodos.filter((todo) => todo.id !== action.payload); // filter all records that are not equal to selected todo id.

    if (state.filteredBy !== 'ALL') { // this function aims to delete todo from local storage based on the given todo id. update the master record if there's a filter. this is to maintain the record in the local storage.
      todos = getToDoList(); // get todos from local storage.
      updatedToDoList = todos.filter((todo) => todo.id !== action.payload); // filter all records that are not equal to selected todo id.
      setToDoList(JSON.stringify(updatedToDoList)); // set new todo list when filter is applied.
    } else setToDoList(JSON.stringify(tempTodos)); // set new todo list after updating the todo status.

    return {
      ...state,
      todos: tempTodos
    };

  case DELETE_ALL_TODOS:
    setToDoList('[]');
    return {
      ...state,
      todos: []
    };

  case FILTER_TODOS:
    todos = getToDoList();
    const { filter } = action.payload;
    filteredTodos = todos.filter((todo) => todo.status === filter);
    return {
      ...state,
      filteredBy: filter,
      todos: filter === 'ALL' ? todos : filteredTodos,
    };

  default:
    return state;
  }
};

export default reducer;
