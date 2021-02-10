import { Todo, EnhancedTodoStatus } from '../../models/todo'

export enum TodoTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  SET_TODOS = 'SET_TODOS',
  CREATE_TODO = 'CREATE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  DELETE_TODOS = 'DELETE_TODOS',
  TOGGLE_TODOS = 'TOGGLE_TODOS',
  SET_DISPLAY_FILTER = 'SET_DISPLAY_FILTER'
}

interface FetchTodosAction {
  type: typeof TodoTypes.FETCH_TODOS
  payload?: undefined
}

export const fetchTodos = (): FetchTodosAction => ({
  type: TodoTypes.FETCH_TODOS
})

interface SetTodosAction {
  type: typeof TodoTypes.SET_TODOS
  payload: Todo[]
}

export const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: TodoTypes.SET_TODOS,
  payload: todos
})

interface CreateTodoAction {
  type: typeof TodoTypes.CREATE_TODO
  payload: Todo
}

export const createTodo = (todo: Todo): CreateTodoAction => ({
  type: TodoTypes.CREATE_TODO,
  payload: todo
})

interface UpdateTodoAction {
  type: typeof TodoTypes.UPDATE_TODO
  payload: Todo
}

export const updateTodo = (todo: Todo): UpdateTodoAction => ({
  type: TodoTypes.UPDATE_TODO,
  payload: todo
})

interface DeleteTodoAction {
  type: typeof TodoTypes.DELETE_TODO
  payload: string
}

export const deleteTodo = (id: string): DeleteTodoAction => ({
  type: TodoTypes.DELETE_TODO,
  payload: id
})

interface DeleteTodosAction {
  type: typeof TodoTypes.DELETE_TODOS
  payload?: undefined
}

export const deleteTodos = (): DeleteTodosAction => ({
  type: TodoTypes.DELETE_TODOS
})

interface ToggleTodosAction {
  type: typeof TodoTypes.TOGGLE_TODOS
  payload: boolean
}

export const toggleTodos = (checked: boolean): ToggleTodosAction => ({
  type: TodoTypes.TOGGLE_TODOS,
  payload: checked
})

interface SetDisplayFilterAction {
  type: typeof TodoTypes.SET_DISPLAY_FILTER
  payload: EnhancedTodoStatus
}

export const setDisplayFilter = (status: EnhancedTodoStatus): SetDisplayFilterAction => ({
  type: TodoTypes.SET_DISPLAY_FILTER,
  payload: status
})

export type TodoActionTypes = FetchTodosAction
| SetTodosAction
| CreateTodoAction
| UpdateTodoAction
| DeleteTodoAction
| DeleteTodosAction
| ToggleTodosAction
| SetDisplayFilterAction
