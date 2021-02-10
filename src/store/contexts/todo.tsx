import React, { createContext, useReducer } from 'react'

import { Todo, TodoStatus, EnhancedTodoStatus } from '../../models/todo'

import { TodoTypes, TodoActionTypes } from '../actions/todo'

interface TodoState {
  todos: Todo[]
  displayFilter: EnhancedTodoStatus
  loading: boolean
}

type TodoContextType = [TodoState, React.Dispatch<TodoActionTypes>]

const initialState: TodoState = {
  todos: [],
  displayFilter: 'ALL',
  loading: false
}

const reducer = (state: TodoState, { type, payload }: TodoActionTypes): TodoState => {
  switch (type) {
    case TodoTypes.FETCH_TODOS:
      return { ...state, loading: true }
    case TodoTypes.SET_TODOS:
      return { ...state, todos: payload as Todo[], loading: false }
    case TodoTypes.CREATE_TODO:
      return { ...state, todos: [...state.todos, payload] as Todo[] }
    case TodoTypes.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === (payload as Todo).id
          ? payload as Todo
          : todo)
      }
    case TodoTypes.DELETE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== payload) }
    case TodoTypes.DELETE_TODOS:
      return { ...state, todos: [] }
    case TodoTypes.TOGGLE_TODOS:
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          status: payload as boolean ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }))
      }
    case TodoTypes.SET_DISPLAY_FILTER:
      return {
        ...state,
        displayFilter: payload as EnhancedTodoStatus
      }
    default:
      return state
  }
}

export const TodoContext = createContext<TodoContextType>([{}, {}] as TodoContextType)

export const TodoContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <TodoContext.Provider value={[state, dispatch]}>
      {children}
    </TodoContext.Provider>
  )
}
