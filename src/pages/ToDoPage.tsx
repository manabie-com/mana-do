import React, {useEffect, useReducer, useState} from 'react';
import reducer, {initialState} from 'store/reducer';
import {setTodos} from 'store/actions';
import {TodoStatus} from 'models/todo';
import TodoToolBar from "components/TodoToolBar";
import TodoList from "components/TodoList";
import Service from 'service';
import TodoCreation from "components/TodoCreation";

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    useEffect(() => {
        (async () => {
            await Service.updateTodos(todos);
        })()
    }, [todos])

    const propsTodoList = {showing, setShowing, dispatch, todos};
    const propsTodoToolBar = {showing, setShowing, dispatch, todos};

    return (
        <div className="Todo__container">
            <TodoCreation dispatch={dispatch} />
            <TodoList {...propsTodoList} />
            <TodoToolBar {...propsTodoToolBar} />
        </div>
    );
};

export default ToDoPage;
