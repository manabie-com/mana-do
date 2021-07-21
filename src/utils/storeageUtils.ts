import {initialState} from '../store/reducer';
import {Todo, TodoStatus} from '../models/todo';
import {createTodo, deleteTodo, updateTodoContent, updateTodoStatus} from "./todoUtils";

export const storeLoginToken = (token: string) => localStorage.setItem('token', token);

export const removeLoginToken = () => localStorage.removeItem('token');

export const getTokenStorage = () => localStorage.getItem('token');

export const storeReducerStorage = (data: object) => localStorage.setItem('reducerLocalStorage', JSON.stringify(data));

export const getReducerFromStorage = () => localStorage.getItem('reducerLocalStorage');

export const getTodosFromStorage = () => {
  const reducer = getReducerFromStorage();
  if (reducer) {
    const { todos } = JSON.parse(reducer);

    return todos;
  }

  return [];
};

export const storeTodos = (todoItem: Todo) => {
  const reducer = getReducerFromStorage();

  if (!reducer) {
    const newReducer = {
      todos: [todoItem]
    }
    storeReducerStorage(newReducer);
  } else {
    const parsed = JSON.parse(reducer);
    const newData = createTodo(parsed, todoItem);
    storeReducerStorage(newData);
  }
}

export const clearTodoStorage = () => {
  const reducer = getReducerFromStorage();
  if (reducer) {
    const parsed = JSON.parse(reducer);
    const newReducer = {
      ...parsed,
      todos: []
    }
    storeReducerStorage(newReducer)
  }
}

export const storeTodosStatus = (todoId: string, isChecked: boolean) => {
  const reducer = getReducerFromStorage();
  if (reducer) {
    const parsed = JSON.parse(reducer);
    storeReducerStorage(updateTodoStatus(parsed, todoId, isChecked))
  }
}

export const storeToggleAllTodosStatus = (checked: boolean) => {
  const reducer = getReducerFromStorage();
  if (reducer) {
    const parsed = JSON.parse(reducer);
    const tempTodos = parsed.todos.map((todo: Todo) => ({
      ...todo,
      status: checked ? TodoStatus.Completed : TodoStatus.Active
    }));
    const data = {
      ...parsed,
      todos: tempTodos
    }
    storeReducerStorage(data)
  }
}

export const storeTodosContent = (todoId: string, content: string) => {
  const reducer = getReducerFromStorage();
  if (reducer) {
    const parsed = JSON.parse(reducer);
    const newTodo = updateTodoContent(parsed.todos, todoId, content);
    const data = {
      ...parsed,
      todos: newTodo
    }
    storeReducerStorage(data);
  }
}

export const storeDeleteTodos = (todoId: string) => {
  const reducer = getReducerFromStorage();
  if (reducer) {
    const parsed = JSON.parse(reducer);
    storeReducerStorage(deleteTodo(parsed, todoId))
  }
}

export const initializerState = (initialValue = initialState) => {
  const localReducerData = getReducerFromStorage();
  if (localReducerData) {
    return JSON.parse(localReducerData);
  }
  storeReducerStorage(initialValue);
  return initialValue;
}
