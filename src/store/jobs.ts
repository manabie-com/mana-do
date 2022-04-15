import {
  createTodoSuccess,
  deleteAllTodosSuccess,
  deleteTodoSuccess,
  getTodosSuccess,
  toggleAllTodosSuccess,
  updateTodoSuccess,
} from './actions'
import Service from '../service'
import { TodoStatus } from '../models/todo'
import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  DELETE_ALL_TODOS,
  TOGGLE_ALL_TODOS,
} from '../config/constants'
import {
  GetTodoSuccessAction,
  CreateTodoAction,
  CreateTodoSuccessAction,
  UpdateTodoAction,
  UpdateTodoSuccessAction,
  DeleteTodoAction,
  DeleteTodoSuccessAction,
  DeleteAllTodosAction,
  DeleteAllTodosSuccessAction,
  ToggleAllTodosAction,
  ToggleAllTodosSuccessAction,
} from '../types/actions'

interface Jobs {
  [key: string]: Function
}

const getTodos = async (_: any, dispatch: React.Dispatch<GetTodoSuccessAction>) => {
  const resp = await Service.getTodos()
  dispatch(getTodosSuccess(resp))
}

const createTodo = async (
  action: CreateTodoAction,
  dispatch: React.Dispatch<CreateTodoSuccessAction>
) => {
  const resp = await Service.createTodo(action.payload)
  dispatch(createTodoSuccess(resp))
}

const updateTodo = async (
  action: UpdateTodoAction,
  dispatch: React.Dispatch<UpdateTodoSuccessAction>
) => {
  const { todoId, status, content } = action.payload
  await Service.updateTodo(todoId, { status, content })
  dispatch(updateTodoSuccess(todoId, { status, content }))
}

const deleteTodo = async (
  action: DeleteTodoAction,
  dispatch: React.Dispatch<DeleteTodoSuccessAction>
) => {
  await Service.deleteTodo(action.payload)
  dispatch(deleteTodoSuccess(action.payload))
}

const deleteAllTodos = async (
  _: DeleteAllTodosAction,
  dispatch: React.Dispatch<DeleteAllTodosSuccessAction>
) => {
  await Service.deleteAllTodos()
  dispatch(deleteAllTodosSuccess())
}

const toggleAllTodos = async (
  action: ToggleAllTodosAction,
  dispatch: React.Dispatch<ToggleAllTodosSuccessAction>
) => {
  const { checked, todoIds } = action.payload
  const status: TodoStatus = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
  await Service.toggleAllTodos(todoIds, status)
  dispatch(toggleAllTodosSuccess(todoIds, status))
}

const jobs: Jobs = {
  [GET_TODOS]: getTodos,
  [CREATE_TODO]: createTodo,
  [UPDATE_TODO]: updateTodo,
  [DELETE_TODO]: deleteTodo,
  [DELETE_ALL_TODOS]: deleteAllTodos,
  [TOGGLE_ALL_TODOS]: toggleAllTodos,
}

export default jobs
