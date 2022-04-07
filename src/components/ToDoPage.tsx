import React, { createContext, useEffect, useReducer } from 'react';
import reducer, { initialState } from 'store/reducer';
import {
    setTodos,
    AppActions
} from 'store/actions';
import Service from 'service';
import { Header } from 'components/Header';
import { TodoList } from 'components/TodoList';
import { Toolbar } from 'components/Toolbar';
import './ToDoPage.scss';

export type GlobalContent = {
    todos: string[],
    dispatch: React.Dispatch<AppActions>
}

export const TodoContext = createContext<any>({});

export const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    return (
        <TodoContext.Provider value={{todos, dispatch}}>
            <h1>Todos</h1>
            <div className="Todo">
                <Header />
                <TodoList />
                <Toolbar />
            </div>
        </TodoContext.Provider>
    );
};
