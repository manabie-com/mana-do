import React, { createContext, useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'

import { TodoStatus } from '../models/todo'
import Service from '../service'
import { AppActions, setTodos } from '../store/actions'
import reducer, { AppState, initialState } from '../store/reducer'

export type EnhanceTodoStatus = TodoStatus | 'ALL'

interface ITodoContext {
  state: AppState
  dispatch: React.Dispatch<AppActions>
}

export const TodoContext = createContext<ITodoContext>({} as ITodoContext)

const TodoContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const history = useHistory()

  useEffect(() => {
    const getTodos = async () => {
      try {
        const resp = await Service.getTodos()
        dispatch(setTodos(resp || []))
      } catch (error) {
        if (error.response.status === 401) {
          history.push('/')
        }
      }
    }
    getTodos()
  }, [history])

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContextProvider
