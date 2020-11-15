import React from 'react';
import {TodoStatus} from "../../models/todo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardList} from "@fortawesome/free-solid-svg-icons";

const ToDoToolbar = ({todos, activeTodos, onDeleteAllTodo, onToggleAllTodo, showing, setShowing}) => {
    return (
        <>
            {
                todos.length > 0 ?
                    <div className="todos-toolbar">
                        <label className="todos-item_select">
                            <input
                                className="todos-checkbox"
                                type="checkbox"
                                checked={activeTodos === 0}
                                onChange={onToggleAllTodo}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <div className="tab-bar">
                            <div className={`tab ${showing === 'ALL' ? 'current' : ''}`}>
                                <button onClick={() => setShowing('ALL')} data-hover="ALL">
                                    ALL
                                </button>
                            </div>
                            <div className={`tab ${showing === TodoStatus.ACTIVE ? 'current' : ''}`}>
                                <button onClick={() => setShowing(TodoStatus.ACTIVE)} data-hover="ACTIVE">
                                    ACTIVE
                                </button>
                            </div>
                            <div className={`tab ${showing === TodoStatus.COMPLETED ? 'current' : ''}`}>
                                <button onClick={() => setShowing(TodoStatus.COMPLETED)} data-hover="COMPLETED">
                                    COMPLETED
                                </button>
                            </div>
                        </div>
                        <button className="btn btn-clear" onClick={onDeleteAllTodo} disabled={todos.length === 0}>
                            Clear All
                        </button>
                    </div>
                    : <div className="todos-nothing">
                        <div className="todos-nothing_title">Planning the daily to do, <br/>it has never been so much effective</div>
                        <div className="todos-nothing_icon"><FontAwesomeIcon icon={faClipboardList}/></div>
                    </div>
            }
        </>
    );
};

export default ToDoToolbar;
