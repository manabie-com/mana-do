import React, {ChangeEvent} from 'react';
import {Todo, TodoStatus} from "../models/todo";
import {isTodoActive} from "../utils";
import {EnhanceTodoStatus} from "../ToDoPage";

interface Props {
    todos: Todo[];
    onToggleAllTodo: (e: ChangeEvent<HTMLInputElement>) => void;
    setShowing: React.Dispatch<EnhanceTodoStatus>;
    showing: EnhanceTodoStatus;
    onDeleteAllTodo: () => void;
}

const TodoToolbar: React.FC<Props> = (props) => {
    const isAllTodoChecked = !(props.todos.findIndex(item => isTodoActive(item)) !== -1);
    return (
        <div className="Todo__toolbar">
            {props.todos.length > 0 ?
                <label className="container">
                    <input
                        checked={isAllTodoChecked}
                        type="checkbox"
                        onChange={props.onToggleAllTodo}
                    />
                    <span className="checkmark" />
                </label> : <div/>
            }
            <div className="Todo__tabs">
                <button className={`Action__btn ${props.showing === 'ALL' ? 'active' : ''}`}
                        onClick={()=>props.setShowing('ALL')}>
                    All
                </button>
                <button className={`Action__btn ${props.showing === TodoStatus.ACTIVE ? 'active' : ''}`}
                        onClick={()=>props.setShowing(TodoStatus.ACTIVE)}>
                    Active
                </button>
                <button className={`Action__btn ${props.showing === TodoStatus.COMPLETED ? 'active' : ''}`}
                        onClick={()=>props.setShowing(TodoStatus.COMPLETED)}>
                    Completed
                </button>
            </div>
            <button className="Action__btn" onClick={props.onDeleteAllTodo}>
                Clear all todos
            </button>
        </div>
    );
};

export default TodoToolbar;
