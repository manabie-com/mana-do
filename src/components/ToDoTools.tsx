import React from 'react';
import {TodoStatus} from '../models/todo';

const ToDoTools = (props: any) => {
    return <>
        <div className="Todo__toolbar">
            <div className="status-filter">
                Status filter
            </div>
            <div className="Todo__tabs">
                <button className={`btn btn-primary ${
                    props.showing === 'ALL' ?
                        'active' : ''
                }`}
                        onClick={() => props.setShowing('ALL')}>
                    All
                </button>
                <button className={`btn btn-primary ${
                    props.showing === TodoStatus.ACTIVE ?
                        'active' : ''
                }`}
                        onClick={() => props.setShowing(TodoStatus.ACTIVE)}>
                    Active
                </button>
                <button className={`btn btn-primary ${
                    props.showing === TodoStatus.COMPLETED ?
                        'active' : ''
                }`}
                        onClick={() => props.setShowing(TodoStatus.COMPLETED)}>
                    Completed
                </button>
            </div>
            <button className="btn btn-primary btn-right" onClick={props.onDeleteAllTodo}>
                Clear all
            </button>
        </div>
    </>;
};

export default ToDoTools;