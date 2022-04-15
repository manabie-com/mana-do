import {
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  DELETE_ALL_TODOS,
  DELETE_ALL_TODOS_SUCCESS,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  GET_TODOS,
  GET_TODOS_SUCCESS,
  TOGGLE_ALL_TODOS,
  TOGGLE_ALL_TODOS_SUCCESS,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
} from '../../config/constants'
import { fakeTodo, fakeTodoList } from '../../test/liveState'
import reducer, { initialState } from '../reducer'
import {
  GetTodoSuccessAction,
  CreateTodoSuccessAction,
  UpdateTodoSuccessAction,
  DeleteTodoSuccessAction,
  DeleteAllTodosSuccessAction,
  ToggleAllTodosSuccessAction,
} from '../../types/actions'
import { TodoStatus } from '../../models/todo'

test('should return the state with loading is true', () => {
  expect(reducer(initialState, { type: GET_TODOS })).toEqual({
    ...initialState,
    isLoading: true,
  })
  expect(reducer(initialState, { type: CREATE_TODO, payload: 'test' })).toEqual({
    ...initialState,
    isCreating: true,
  })
  expect(reducer(initialState, { type: UPDATE_TODO, payload: { todoId: 'test' } })).toEqual({
    ...initialState,
    isUpdating: true,
  })
  expect(reducer(initialState, { type: DELETE_TODO, payload: 'test' })).toEqual({
    ...initialState,
    isUpdating: true,
  })
  expect(
    reducer(initialState, {
      type: TOGGLE_ALL_TODOS,
      payload: {
        todoIds: ['test'],
        checked: true,
      },
    })
  ).toEqual({
    ...initialState,
    isLoading: true,
  })
  expect(reducer(initialState, { type: DELETE_ALL_TODOS })).toEqual({
    ...initialState,
    isLoading: true,
  })
})

test('should update the state correctly when receive GET_TODOS_SUCCESS action', () => {
  const action: GetTodoSuccessAction = {
    type: GET_TODOS_SUCCESS,
    payload: [fakeTodo],
  }
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    todos: [fakeTodo],
  })
})

test('should update the state correctly when receive CREATE_TODO_SUCCESS action', () => {
  const action: CreateTodoSuccessAction = {
    type: CREATE_TODO_SUCCESS,
    payload: fakeTodo,
  }
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    todos: [fakeTodo],
  })
})

test('should update the state correctly when receive UPDATE_TODO_SUCCESS action', () => {
  const action: UpdateTodoSuccessAction = {
    type: UPDATE_TODO_SUCCESS,
    payload: {
      todoId: fakeTodo.id,
      content: 'test1',
      status: TodoStatus.COMPLETED,
    },
  }
  const state = { ...initialState, todos: [fakeTodo] }
  expect(reducer(state, action)).toEqual({
    ...initialState,
    todos: [
      {
        ...fakeTodo,
        content: 'test1',
        status: TodoStatus.COMPLETED,
      },
    ],
  })
})

test('should update the state correctly when receive DELETE_TODO_SUCCESS action', () => {
  const action: DeleteTodoSuccessAction = {
    type: DELETE_TODO_SUCCESS,
    payload: fakeTodo.id,
  }
  const state = { ...initialState, todos: [fakeTodo] }
  expect(reducer(state, action)).toEqual({
    ...initialState,
    todos: [],
  })
})

test('should update the state correctly when receive TOGGLE_ALL_TODOS_SUCCESS action', () => {
  const action: ToggleAllTodosSuccessAction = {
    type: TOGGLE_ALL_TODOS_SUCCESS,
    payload: {
      todoIds: fakeTodoList.map((todo) => todo.id),
      status: TodoStatus.COMPLETED,
    },
  }
  const state = { ...initialState, todos: fakeTodoList }
  expect(reducer(state, action)).toEqual({
    ...initialState,
    todos: fakeTodoList.map((todo) => ({
      ...todo,
      status: TodoStatus.COMPLETED,
    })),
  })
})

test('should update the state correctly when receive DELETE_ALL_TODOS_SUCCESS action', () => {
  const action: DeleteAllTodosSuccessAction = {
    type: DELETE_ALL_TODOS_SUCCESS,
  }
  const state = { ...initialState, todos: fakeTodoList }
  expect(reducer(state, action)).toEqual({
    ...initialState,
    todos: [],
  })
})
