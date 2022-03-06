import React, { ReactElement } from 'react'
import todoReducer from './reducers/todo'
import { combineReducers } from './utils'

type ProviderProps = {
    children: ReactElement
}

const initialState = {
    todoReducer: {}
}
const rootReducer = combineReducers({ todoReducer });

export const StoreContext = React.createContext([] as any);

export const StoreProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = React.useReducer(rootReducer, initialState);

    const store = React.useMemo(() => [state, dispatch], [state]);
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

export const useAppState = () => React.useContext(StoreContext);