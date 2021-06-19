import React from 'react'

export interface ITodoPageContext {
    selectedItem: string
}

export const TodoPageContext = React.createContext<ITodoPageContext>(
    {
        selectedItem: ''
    }
)