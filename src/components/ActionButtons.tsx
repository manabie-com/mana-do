import React, { useEffect, useReducer, useState } from 'react';
import Service from '../service';
import reducer, { initialState } from '../store/reducer';
import {
    setTodos
} from '../store/actions';
import { isTodoCompleted } from '../utils';

import { TodoStatus } from '../models/todo';

const ActionButtons = (props: any) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);

    const toggleShowing = props.toggleShowing;

    const onToggleAllTodo = props.onToggleAllTodo;

    const onDeleteAllTodo = props.onDeleteAllTodo;

    const tasksList = props.tasksList;

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [tasksList])
    return (
          <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className="All__btn" onClick={() => toggleShowing('ALL')}>
                        All
                    </button>
                    <button className="Active__btn" onClick={() => toggleShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Completed__btn" onClick={() => toggleShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div> 
    )
}

export default ActionButtons