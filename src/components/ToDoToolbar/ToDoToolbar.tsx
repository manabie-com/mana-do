import React from 'react';
import { EnhanceTodoStatus, Todo, TodoStatus } from '../../models';
import { toCapitalize } from '../../utils';
import './ToDoToolbar.css'

export interface ToDoToolbarProps {
    todos: Todo[],
    showing: EnhanceTodoStatus,
    onToggleAllTodo(e: React.ChangeEvent<HTMLInputElement>): void,
    setShowing(todoStatus: EnhanceTodoStatus): void,
    onDeleteAllTodo(): void
}

function ToDoToolbar({todos, showing, onToggleAllTodo, setShowing, onDeleteAllTodo}: ToDoToolbarProps) {
    const filterButtons: EnhanceTodoStatus[] = ["ALL", TodoStatus.ACTIVE, TodoStatus.COMPLETED];
    return (
        <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    {
                        filterButtons.map((button: EnhanceTodoStatus, index) => {
                            return (
                                <button 
                                    key={index} 
                                    className={"Action__btn" + (showing === button ? " active" : "")} 
                                    onClick={()=>setShowing(button)}>
                                    {toCapitalize(button)}
                                </button>
                            );
                        })
                    }
                </div>
                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
    )
}

export default ToDoToolbar;