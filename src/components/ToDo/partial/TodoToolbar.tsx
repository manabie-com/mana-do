import React  from 'react';

import { TodoStatus, Todo } from '../../../models/todo';

import {
    toggleAllTodos,
    deleteAllTodos
} from '../../../store/actions';

const ALL: string = "ALL";
type EnhanceTodoStatus = TodoStatus | typeof ALL;

interface TodoToolbarTypes {
    todos: Array<Todo>,
    showing: EnhanceTodoStatus,
    setShowing: any,
    dispatch: any
};

const TodoToolbar = ({ todos, showing, setShowing, dispatch }: TodoToolbarTypes) => {
    const isCheckedTodoAll = () => todos.length > 0 && todos.find(todo => todo.status === TodoStatus.ACTIVE);

    const getTabsBtnStatus = (bool: boolean) => bool ? 'active' : '';

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(toggleAllTodos(e.target.checked));

    const onDeleteAllTodo = () => dispatch(deleteAllTodos());

    return (
        <div className="Todo__toolbar">
            {todos.length > 0 ?
                <input
                    type="checkbox"
                    data-testid="toggle__all__todo"
                    onChange={onToggleAllTodo}
                    checked={!isCheckedTodoAll()}
                /> : <div/>
            }
            <div className="Todo__tabs">
                <button className={`Action__btn ${getTabsBtnStatus(showing === ALL)}`} onClick={() => setShowing(ALL)}>
                    All
                </button>
                <button className={`Action__btn ${getTabsBtnStatus(showing === TodoStatus.ACTIVE)}`} onClick={() => setShowing(TodoStatus.ACTIVE)}>
                    Active
                </button>
                <button className={`Action__btn ${getTabsBtnStatus(showing === TodoStatus.COMPLETED)}`} onClick={() => setShowing(TodoStatus.COMPLETED)}>
                    Completed
                </button>
            </div>
            <button className="Action__btn" onClick={onDeleteAllTodo}>
                Clear all todos
            </button>
        </div>
    )
}

export default TodoToolbar;