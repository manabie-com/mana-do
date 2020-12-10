import React, { useState, useReducer } from 'react';
import reducer, { initialState } from '../../store/reducer';
import { TodoStatus } from '../../models/todo';
import {
    toggleAllTodos,
    deleteAllTodos,
} from '../../store/actions';
import { isTodoCompleted } from '../../utils';
import Service from '../../service';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const Actions = (props: any) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

    const changeShowing = props.changeShowing; // Pass showing status to update ShowTodoslist
    const updateTodoList = props.updateTodoList; // 


    const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked));
        const resp = await Service.getTodos();
        updateTodoList(resp);
    }

    const onDeleteAllTodo = async () => {
        dispatch(deleteAllTodos());
        const resp = await Service.getTodos();
        updateTodoList(resp);
    }

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    const toggleShowing = (status: EnhanceTodoStatus) => {
        setShowing(status);
        changeShowing(status);
    }
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
                <button className="All__btn" onClick={() => toggleShowing("ALL")}>
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

export default Actions