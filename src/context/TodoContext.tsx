import React, { createContext, useReducer } from 'react'

import { TodoStatus } from 'src/models/todo'
import { AppActions } from 'src/store/actions'
import reducer, { AppState, initialState } from 'src/store/reducer'

export type EnhanceTodoStatus = TodoStatus | 'ALL'

interface ITodoContext {
  state: AppState
  dispatch: React.Dispatch<AppActions>
}

export const TodoContext = createContext<ITodoContext>({} as ITodoContext)

const TodoContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContextProvider
