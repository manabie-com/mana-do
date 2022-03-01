import React from 'react';
import { TodoStatus } from 'models/todo';
import './index.css';

type EnhanceTodoStatus = TodoStatus | 'ALL';

export interface TodoToolbarProps {
    todoLength: number;
    showing: EnhanceTodoStatus
    onToggleAllTodo(e: any): void;
    onDeleteAllTodo(): void;
    onSetShowing(option: EnhanceTodoStatus): void;
}

export const ToDoToolbar = (props: TodoToolbarProps) => {
    return (
        <div className="Todo__toolbar">
            {props.todoLength > 0 ?
                <input
                    type="checkbox"
                    className="border-color-primary"
                    onChange={props.onToggleAllTodo}
                /> : <div />
            }
            <div className="Todo__tabs">
                <button className={("Action__btn color-white ") + (props.showing === TodoStatus.ALL ? "active" : "")} onClick={() => props.onSetShowing(TodoStatus.ALL)}>
                    All
                </button>
                <button className={("Action__btn color-white ") + (props.showing === TodoStatus.ACTIVE ? "active" : "")} onClick={() => props.onSetShowing(TodoStatus.ACTIVE)}>
                    Active
                </button>
                <button className={("Action__btn color-white ") + (props.showing === TodoStatus.COMPLETED ? "active" : "")} onClick={() => props.onSetShowing(TodoStatus.COMPLETED)}>
                    Completed
                </button>
            </div>
            <button className="Action__btn color-white bg-warning" onClick={props.onDeleteAllTodo}>
                Clear all todos
            </button>
        </div>
    );
};

