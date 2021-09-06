import React, {useEffect, useReducer, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    AppActions,
    setTodos
} from './store/actions';
import {Todo, TodoStatus} from './models/todo';
import ToDoCreation from './components/ToDoCreation';
import ToDoList from './components/ToDoList';
import ToDoToolbar from './components/ToDoToolbar';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<TodoStatus>(TodoStatus.ALL);

    useEffect(()=>{
        (async ()=>{
            try {
                const todoListString = localStorage.getItem('todoList')||''
                const todoList: Array<Todo> = JSON.parse(todoListString);
                dispatch(setTodos(todoList||[]));
            } catch(err) {
                dispatch(setTodos([]));
            }
        })()
    }, []);

    const updateShowing = (status: TodoStatus) => {
        setShowing(status)
    }

    const callAction = (action: AppActions) => {
        dispatch(action)
    }

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos))
    }, [todos]);

    return (
        <div className="ToDo__container">
            <ToDoCreation action={callAction} />
            <ToDoList todos={todos} showing={showing} action={callAction} />
            <ToDoToolbar todos={todos} action={callAction} updateShowing={updateShowing} />
        </div>
    );
};

export default ToDoPage;