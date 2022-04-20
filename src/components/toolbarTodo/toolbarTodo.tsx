import React from 'react';
import {
    toggleAllTodos,
    deleteAllTodos,
} from '../../store/actions';
import {TodoStatus, ComponentProps} from '../../models/todo';
import Service from '../../service';

const TodoToolbar = ({todos, dispatch, setShowing}: ComponentProps) => {
    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = async() => {
        try {
            await Service.deleteTodos();
            dispatch(deleteAllTodos());    
        } catch (error) {
            console.log('Can\'t delete all todos')   
        }
    }

    return (
        <div className="Todo__toolbar">
            {todos.length > 0 ?
                <input
                    type="checkbox"
                    onChange={onToggleAllTodo}
                /> : ''
            }
            <div className="Todo__tabs">
                <button className="Action__btn primary" onClick={()=>setShowing('ALL')}>
                    All ( {todos.length} )
                </button>
                <button className="Action__btn filter" onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                    Active ( {todos.filter(item => item.status === 'ACTIVE').length} )
                </button>
                <button className="Action__btn filter" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                    Completed ( {todos.filter(item => item.status === 'COMPLETED').length} )
                </button>
            </div>
            <button className="Action__btn delete" onClick={onDeleteAllTodo}>
                Clear all todos
            </button>
        </div>
    )
}

export default TodoToolbar;