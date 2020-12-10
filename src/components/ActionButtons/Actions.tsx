import React from 'react';

const Actions = (props:any) => {
    const todos = props.todos;
    const activeTodos = props.activeTodos;
    const onToggleAllTodo = props.onToggleAllTodo;
    const onDeleteAllTodo = props.onDeleteAllTodo;
    const toggleShowing = props.toggleShowing;
    const TodoStatus = props.TodoStatus;

    return (
        <div className="Todo__toolbar">
        {todos.length > 0 ?
            <input
                type="checkbox"
                checked={activeTodos === 0}
                onChange={onToggleAllTodo}
            /> : <div />
        }
        <div className="Todo__tabs">
            <button className="All__btn" onClick={() => toggleShowing("ALL")}>
                All
            </button>
            <button className="Active__btn" onClick={() => toggleShowing(TodoStatus.ACTIVE)}>
                Active
            </button>
            <button className="Completed__btn" onClick={() => toggleShowing(TodoStatus.COMPLETED)}>
                Completed
            </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
            Clear all todos
        </button>
    </div>
    )
}

export default Actions