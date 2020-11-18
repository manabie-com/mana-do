import React, { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import reducer, { AppState } from '../../store/reducer';
import {
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodo,
} from '../../store/actions';
import Service from '../../service';

import ToDoComponent from './Component'

const todosKey = 'todos'
const todosString = localStorage.getItem(todosKey)
const initialState: AppState = todosString ? JSON.parse(todosString) : { todos: [] }

const ToDoPage = () => {
    const history = useHistory();
    const [{ todos }, dispatch] = useReducer(reducer, initialState);

    // save the app state to local storage whenever it is changed
    useEffect(()=>{
        localStorage.setItem(todosKey, JSON.stringify({ todos }))
    }, [todos])

    const onCreateTodo = async (value: string) => {
        try {
            const resp = await Service.createTodo(value);
            dispatch(createTodo(resp));
        } catch (e) {
            if (e.response.status === 401) {
                history.push('/')
            }
        }
    }

    const onUpdateTodoStatus = (todoId: string, checked: boolean) => {
        dispatch(updateTodoStatus(todoId, checked))
    }

    const onToggleAllTodo = (checked: boolean) => {
        dispatch(toggleAllTodos(checked))
    }

    const onDeleteAllTodos = () => {
        dispatch(deleteAllTodos());
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId))
    }

    const onUpdateTodo = (todoId: string, value: string) => {
        dispatch(updateTodo(todoId, value))
    }

    return (
        <ToDoComponent
            todos={todos}
            onCreateTodo={onCreateTodo}
            onUpdateTodoStatus={onUpdateTodoStatus}
            onToggleAllTodos={onToggleAllTodo}
            onDeleteAllTodos={onDeleteAllTodos}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
        />
    )
};

export default ToDoPage;
