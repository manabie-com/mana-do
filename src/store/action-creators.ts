import { Todo } from "models/todo"
import { 
  CREATE_TODO, 
  DELETE_ALL_TODOS, 
  DELETE_TODO, 
  SET_TODO, 
  TOGGLE_ALL_TODOS, 
  TOGGLE_THEME, 
  UPDATE_TODO_CONTENT, 
  UPDATE_TODO_STATUS 
} from "./action-types"
import { 
  CreateTodoAction, 
  DeleteAllTodosAction, 
  DeleteTodoAction, 
  SetTodoAction, 
  ToggleAllTodosAction, 
  ToggleThemeAction, 
  UpdateTodoContentAction, 
  UpdateTodoStatusAction 
} from "./actions";

export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: SET_TODO,
    payload: todos
  }
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: newTodo
  }
}

export function updateTodoStatus(todoId: string, checked: boolean): UpdateTodoStatusAction {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId,
      checked
    }
  }
}

export function updateTodoContent(todoId: string, content: string): UpdateTodoContentAction {
  return {
    type: UPDATE_TODO_CONTENT,
    payload: {
      todoId,
      content
    }
  }
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return {
    type: DELETE_TODO,
    payload: todoId
  }
}

export function deleteAllTodos(): DeleteAllTodosAction {
  return {
    type: DELETE_ALL_TODOS,
  }
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: checked
  }
}

export function toggleTheme(): ToggleThemeAction {
  return {
    type: TOGGLE_THEME,
  }
}