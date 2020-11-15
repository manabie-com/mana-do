import React, { useEffect, useReducer } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from '../../store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from '../../store/actions';
import Service from '../../service';
import {TodoStatus} from '../../models/todo';

import ToDoComponent from './Component'

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({ history }: RouteComponentProps) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

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

    return (
        <ToDoComponent
            todos={todos}
            onCreateTodo={onCreateTodo}
            onUpdateTodoStatus={onUpdateTodoStatus}
            onToggleAllTodos={onToggleAllTodo}
            onDeleteAllTodos={onDeleteAllTodos}
            onDeleteTodo={onDeleteTodo}
        />
    )
};

export default ToDoPage;
