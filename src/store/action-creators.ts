import { Todo } from "models/todo"
import { 
  CREATE_TODO, 
  DELETE_ALL_TODOS, 
  DELETE_TODO, 
  SET_TODO, 
  TOGGLE_ALL_TODOS, 
  UPDATE_TODO_STATUS 
} from "./action-types"
import { 
  CreateTodoAction, 
  DeleteAllTodosAction, 
  DeleteTodoAction, 
  SetTodoAction, 
  ToggleAllTodosAction, 
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