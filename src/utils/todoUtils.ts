import {Todo, TodoStatus} from '../models/todo';
import {AppState} from "../store/reducer";

// This function to create and return the new todos list without mutate the origin todos
export const createTodo = (state: AppState, todoItem: Todo) => {
  const newTodosValue = [...state.todos]
  newTodosValue.unshift(todoItem);

  return {
    ...state,
    todos: newTodosValue
  }
}

export const updateTodoStatus = (state: AppState, todoId: string, isChecked: boolean) => {
  const newTodos = [...state.todos];
  const foundIndex = findTodoIndexById(newTodos, todoId);
  newTodos[foundIndex].status = isChecked ? TodoStatus.Completed : TodoStatus.Active;

  return {
    ...state,
    todos: newTodos
  }
}

export const updateTodoContent = (todos: Array<Todo>, todoId: string, content: string) => {
  const newTodos = [...todos];
  const foundIndex = findTodoIndexById(todos, todoId);
  newTodos[foundIndex].content = content;

  return newTodos;
}

export const deleteTodo = (state: AppState, todoId: string) => {
  const newTodos = [...state.todos];
  const foundIndex = findTodoIndexById(newTodos, todoId);
  newTodos.splice(foundIndex, 1);

  return {
    ...state,
    todos: newTodos
  }
}

export const findTodoById = (todos: Array<Todo>, todoId: string) => todos.find(todo => todo.id === todoId);

export const findTodoIndexById = (todos: Array<Todo>, todoId: string) => todos.findIndex(todo => todo.id === todoId);
