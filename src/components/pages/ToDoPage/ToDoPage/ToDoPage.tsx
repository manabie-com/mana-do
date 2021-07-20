import React, { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TodoStatus } from '../../../../models/todo';
import Service from '../../../../service';
import { setTodos } from '../../../../store/actions';
import reducer, { initialState } from '../../../../store/reducer';
import CreateTask from '../CreateTask/CreateTask';
import ShowTodoList from '../ShowTodoList/ShowTodoList';
import TodoToolBar from '../TodoToolBar/TodoToolBar';

import './toDoPage.scss'

export type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

    const history = useHistory()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('Vui lòng đăng nhập để tiếp tục!')
            history.push('')
        }
        const data = localStorage.getItem('task')

        if (data) {
            dispatch(setTodos(JSON.parse(data)))
        }

        else {
            (async () => {
                const resp = await Service.getTodos();
                dispatch(setTodos(resp || []));
            })()
        }
    }, [])

    return (
        <div className="ToDo__container">
            <CreateTask dispatch={dispatch} todos={todos} />
            <ShowTodoList showing={showing} todos={todos} dispatch={dispatch} />
            <TodoToolBar setShowing={setShowing} todos={todos} dispatch={dispatch} />
        </div>
    );
};

export default ToDoPage;