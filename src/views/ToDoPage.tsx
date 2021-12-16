import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from '../store/reducer';
import { AppActions, setTodos } from '../store/actions';
import Service from '../service';
import { EnhanceTodoStatus } from '../models/todo';
import TodoList from './TodoList';
import TodoToolbar from './TodoToolbar';
import Input from './Input';

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [todoEditingId, setTodoEditingId] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null);

    const onChangeTodos = (action: AppActions) => {
        dispatch(action)
    }

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    // every time when todo list is changes, we store it into localStorage
    useEffect(() => {
        (async () => {
            await Service.storeTodos(todos);
        })()
    }, [JSON.stringify(todos), todos])

    // I divided ToDoPage into smaller components
    // it makes JSX of this component shorter, easier to read
    return (
        <div className="ToDo__container">
            <h1>Todos</h1>
            <Input {...{ inputRef, todoEditingId, setTodoEditingId, onChangeTodos }} />
            <TodoList {...{ todos, showing, inputRef, onChangeTodos, setTodoEditingId }} />
            <TodoToolbar {...{ todos, onChangeTodos, setShowing }} />
        </div>
    );
};

export default ToDoPage;