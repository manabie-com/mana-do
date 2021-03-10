import React from 'react'
import { Todo, TodoStatus } from '../models/todo';
type EnhanceTodoStatus = TodoStatus | 'ALL';
const TodoTabbar = ({ todos, onShowingTodos, isTodoCompleted, onToggleAllTodo, onDeleteAllTodo }:
    { todos: Todo[], onShowingTodos: Function, isTodoCompleted: Function, onToggleAllTodo: any, onDeleteAllTodo: any }) => {
    const onShowingHandler = (status: EnhanceTodoStatus) => {
        onShowingTodos(status);
    }
    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    const onToggleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggleAllTodo(e);
    }

    const onDeleteHandler = () => {
        onDeleteAllTodo();
    }

    return (
        <div className="Todo__toolbar">
            {/* {todos.length > 0 ?
                <input
                    type="checkbox"
                    checked={activeTodos === 0}
                    onChange={onToggleHandler}
                /> : <div />
            } */}
            <div className="Todo__tabs">
                <button className="Action__btn" onClick={() => onShowingHandler('ALL')}>
                    All
                    </button>
                <button className="Action__btn" onClick={() => onShowingHandler(TodoStatus.ACTIVE)}>
                    Active
                    </button>
                <button className="Action__btn" onClick={() => onShowingHandler(TodoStatus.COMPLETED)}>
                    Completed
                    </button>
            </div>
            <button className="Action__btn" onClick={onDeleteHandler}>
                Clear all todos
                </button>
        </div>

    )
}

export default TodoTabbar
