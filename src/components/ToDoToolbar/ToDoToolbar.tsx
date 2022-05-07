import React from 'react';
import { EnhanceTodoStatus, Todo, TodoStatus } from '../../models';
import { toCapitalize } from '../../utils';
import './ToDoToolbar.css'

export interface ToDoToolbarProps {
    todos: Todo[],
    showing: EnhanceTodoStatus,
    remainTodos: number,
    onToggleAllTodo(e: React.ChangeEvent<HTMLInputElement>): void,
    setShowing(todoStatus: EnhanceTodoStatus): void,
    onDeleteAllTodo(): void
}

function ToDoToolbar({todos, showing, remainTodos, onToggleAllTodo, setShowing, onDeleteAllTodo}: ToDoToolbarProps) {
    const filterButtons: EnhanceTodoStatus[] = ["ALL", TodoStatus.ACTIVE, TodoStatus.COMPLETED];

    return (
        <div className="Todo__toolbar">
                {todos.length > 0 ?
                    ( 
                    <>
                        <input
                            id="toggle-all"
                            type="checkbox"
                            className='toggle'
                            onChange={onToggleAllTodo}
                        />
                        <label className='checkbox-custom' htmlFor="toggle-all"></label>
                    </>
                    ): <div className='Todo__empty-toggle'/>
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
                    <button 
                        className="Action__btn Todo__btn-delete-all" 
                        disabled={todos.length <= 0} 
                        onClick={onDeleteAllTodo}>
                        Clear all todos
                    </button>
                </div>
                <span className='Todo__remain-item'>{remainTodos} item{remainTodos > 0 ? 's' : ''} left</span>
            </div>
    )
}

export default ToDoToolbar;