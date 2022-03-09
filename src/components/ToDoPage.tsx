import React, { useEffect, useReducer } from 'react';

import reducer, { initialState } from '../store/reducer';
import {
    setTodos
} from '../store/actions';
import Service from '../service';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';
import { ToolBar } from './Toolbar';
import { TodoContext } from '../store/context';
import { Todo } from '../models/todo';

const ToDoPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // Don't need to use IIFE here
        // using promise to make it more clearer
        Service.getTodos().then((todos: Todo[]) => {
            dispatch(setTodos(todos));
        }).catch(error => {
            // should notify user
            console.error(error);
            dispatch(setTodos([]));
        });
    }, [])

    useEffect(() => {
        // should prevent the first call, due to the value always is empty
        Service.persistTodos(state.todos);
    }, [state])

    return (
        // using context to pass state and dispatch
        <TodoContext.Provider value={{ state, dispatch }}>
            <div className="ToDo__container">
                <TodoInput />
                <TodoList />
                <ToolBar />
            </div>
        </TodoContext.Provider>
    );
};

export default ToDoPage;