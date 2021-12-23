

import React, { FC, useContext } from 'react'
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import { TodoContext } from '../contexts/TodoContext';

export const  TodoToolbar:FC = () =>{

    const {todoList, onSetShowingTodo, onToggleAllTodos, onDeleteAllTodos} = useContext(TodoContext)
    const {todos} = todoList
    
    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    const toggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggleAllTodos(e.target.checked)
    }

    const deleteAllTodo = () => {
        onDeleteAllTodos()
        
    }
    return (
        <div className="Todo__toolbar">
            {todoList.todos.length > 0 ?
                <input
                    title='togger'
                    data-testid ="checkbox"
                    type="checkbox"
                    checked={activeTodos === 0}
                    onChange={toggleAllTodo}
                /> : <div/>
            }
            <div className="Todo__tabs">
                <button data-testid ="button" className="Action__btn" onClick={()=>onSetShowingTodo('ALL')}>
                    All
                </button>
                <button data-testid ="button" className="Action__btn" onClick={()=>onSetShowingTodo(TodoStatus.ACTIVE)}>
                    Active
                </button>
                <button data-testid ="button" className="Action__btn" onClick={()=>onSetShowingTodo(TodoStatus.COMPLETED)}>
                    Completed
                </button>
            </div>
            <button data-testid ="button" className="Action__btn" onClick={deleteAllTodo}>
                Clear all todos
            </button>
        </div>
    )
}
