import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Todo, TodoStatus } from '../models/todo';
import { isTodoCompleted } from '../utils';

interface PropsTodo {
    todos?: Todo[],
    isDeleteAll?: boolean,
    activeTodos?: number,
    setShowing?: any,
    onToggleAllTodo?: any,
    onDeleteAllTodo?: any,
}

const ToDoAction = ({
    todos = [],
    isDeleteAll = false,
    activeTodos = 0,
    setShowing = () => { },
    onToggleAllTodo = () => { },
    onDeleteAllTodo = () => { },
    ...props
}: PropsTodo) => {

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
                <button className="Action__btn" onClick={() => setShowing('ALL')}>
                    All
                </button>
                <button className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
                    Active
                </button>
                <button className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
                    Completed
                </button>
            </div>
            {isDeleteAll && <button className="Action__btn" onClick={onDeleteAllTodo}>
                Clear all todos
            </button>}
        </div>
    );
};

export default ToDoAction;