import './index.scss';
import React from 'react';
import { TodoStatus } from '../../models/todo';

export default function TodoToolbar(props: any) {
    const {
        todos,
        onToggleAllTodo,
        showing,
        setShowing,
        onDeleteAllTodo
    } = props;

    const actions = ['ALL', TodoStatus.ACTIVE, TodoStatus.COMPLETED];

    return (
        <div className="Todo__toolbar">
            {todos.length > 0 ?
                <input
                    type="checkbox"
                    onChange={onToggleAllTodo}
                /> : <div />
            }
            <div className="Todo__tabs">
                {actions.map((action) => {
                    const selected = showing === action ? 'selected' : '';
                    return (
                        <button className={`Action__btn ${action.toLowerCase()} ${selected}`} onClick={() => setShowing(action)}>
                            {action.toLowerCase()}
                        </button>
                    )
                })}
            </div>
            <button className="Action__btn" onClick={onDeleteAllTodo}>
                Clear all todos
            </button>
        </div>
    )
}