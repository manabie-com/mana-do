import React from 'react';
import { EnhanceTodoStatus, Todo, TodoStatus } from 'models';
import { isTodoCompleted, toCapitalize } from 'utils';
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

    const isCheckedAll = (): boolean => {
        return todos.every(todo => isTodoCompleted(todo));
    }

    return (
        <div data-testid="todo-toolbar" className="Todo__toolbar">
                {todos.length > 0 ?
                    ( 
                    <>
                        <input
                            id="toggle-all"
                            data-testid="todo-toggle"
                            type="checkbox"
                            className='toggle'
                            checked={isCheckedAll()}
                            onChange={onToggleAllTodo}
                        />
                        <label className='checkbox-custom' htmlFor="toggle-all"></label>
                    </>
                    ): <div data-testid="todo-empty-toggle" className='Todo__empty-toggle'/>
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
                        data-testid="todo-delete-all-btn"
                        className="Action__btn Todo__btn-delete-all" 
                        disabled={todos.length <= 0} 
                        onClick={onDeleteAllTodo}>
                        Clear all todos
                    </button>
                </div>
                <span data-testid="todo-remain" className='Todo__remain-item'>{remainTodos} item{remainTodos > 0 ? 's' : ''} left</span>
            </div>
    )
}

export default ToDoToolbar;