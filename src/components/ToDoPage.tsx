import React, { useEffect, useReducer, useRef, useState } from 'react';

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
    const didMountRef = useRef(false);

    useEffect(() => {
        // Don't need to use IIFE here
        // using promise to make it more clearer
        Service.getTodos().then((todos: Todo[]) => {
            dispatch(setTodos(todos));
        }).catch(error => {
            // should notify user
            // console.error(error);
            dispatch(setTodos([]));
        });
    }, [])

    useEffect(() => {
        // should prevent the first call, due to the value always is empty
        if (didMountRef.current) {
            Service.persistTodos(state.todos);
        } else {
            didMountRef.current = true;
        }
    }, [state])

    return (
        // using context for passing state and dispatch down to components
        <TodoContext.Provider value={{ state, dispatch }}>
            <div className="ToDo__container">
                <TodoInput />
                <TodoList />
                <ToolBar />
            </div>
        </TodoContext.Provider>
    );
}

export default ToDoPage;