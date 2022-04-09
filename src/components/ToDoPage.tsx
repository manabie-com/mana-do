import React, { useEffect, useContext } from 'react';
import {
    setTodos,
} from 'store/actions';
import Service from 'service';
import { Header } from 'components/Header';
import { TodoList } from 'components/TodoList';
import { Toolbar } from 'components/Toolbar';
import './ToDoPage.scss';
import { TodoContext } from 'App';

export const ToDoPage = () => {
    const { dispatch } = useContext(TodoContext);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [dispatch])

    return (
        <>
            <h1>Todos</h1>
            <div className="Todo">
                <Header />
                <TodoList />
                <Toolbar />
            </div>
        </>
    );
};
