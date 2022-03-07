import React, {Dispatch, SetStateAction} from "react";
import {AppActions, deleteAllTodos, toggleAllTodos} from "store/actions";
import {Todo, TodoStatus} from "models/todo";
import {isTodoCompleted} from "utils";

type EnhanceTodoStatus = TodoStatus | 'ALL';

interface ToolBarProps {
    dispatch: Dispatch<AppActions>,
    todos: Array<Todo>,
    showing: EnhanceTodoStatus,
    setShowing: Dispatch<SetStateAction<EnhanceTodoStatus>>
}

const TodoToolBar: React.FC<ToolBarProps> = ({dispatch, todos, showing, setShowing}) => {
    const numberTodoByStatus = (status: EnhanceTodoStatus) => status === 'ALL' ? todos.length : todos.filter(todo => todo.status === status).length;
    const actionToolBarClass = (status: EnhanceTodoStatus) => status === showing ? ['Action__btn', '__active'].join(' ') : ['Action__btn'].join(' ');
    const allTodosCompleted = todos.reduce((totalTodoCompleted, todo) => isTodoCompleted(todo) ? totalTodoCompleted : totalTodoCompleted + 1, 0) === 0;

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
        setShowing('ALL');
    }
    const onActionToolBar = (status: EnhanceTodoStatus) => {
        setShowing(status);
    }
    return <>
        {todos.length > 0 &&
        <div className="Todo__toolbar">
            <input type="checkbox" checked={allTodosCompleted} onChange={onToggleAllTodo} />
            <div className="Todo__toolbar__tabs">
                <button className={actionToolBarClass('ALL')} onClick={() => onActionToolBar('ALL')}>All ({numberTodoByStatus('ALL')})</button>
                <button className={actionToolBarClass(TodoStatus.ACTIVE)} onClick={() => onActionToolBar(TodoStatus.ACTIVE)}>Active ({numberTodoByStatus(TodoStatus.ACTIVE)})</button>
                <button className={actionToolBarClass(TodoStatus.COMPLETED)} onClick={() => onActionToolBar(TodoStatus.COMPLETED)}>Completed ({numberTodoByStatus(TodoStatus.COMPLETED)})</button>
            </div>
            <button className="Action__btn __clear-all" onClick={onDeleteAllTodo}>Clear all todos</button>
        </div>
        }
    </>;
};

export default TodoToolBar;
