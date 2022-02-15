import classNames from "classnames";
import { FC } from "react";
import { Todo, TodoStatus } from "../../../models/todo";
import { deleteAllTodos, toggleAllTodos } from "../../../store/actions";
import Service from '../../../service';
import { isTodoCompleted } from "../../../utils";

interface ToolBarProps {
    todos: Array<Todo>;
    dispatch: Function;
    setShowing: Function;
}

const ToolBar: FC<ToolBarProps> = ({ todos, dispatch, setShowing }) => {
    const onDeleteAllTodo = () => {
        const todoIds = todos.map(todo => todo.id);
        Service.deleteAllTodo(todoIds);
        dispatch(deleteAllTodos());
    }
    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { ACTIVE, COMPLETED } = TodoStatus;
        const status = e.target.checked ? COMPLETED : ACTIVE;
        Service.toggleAllTodos(todos, status);
        dispatch(toggleAllTodos(e.target.checked))
    }
    return (
        <>
            <input
                className={classNames("to-do__check-all-btn", { "to-do__check-all-btn--hidden": !todos.length })}
                type="checkbox"
                onChange={e => onToggleAllTodo(e)}
                checked={todos.every(todo => isTodoCompleted(todo))}
            />
            <div className="to-do__tabs">
                <button className="action-btn" onClick={() => setShowing('ALL')}>
                    All
                </button>
                <button className="action-btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
                    Active
                </button>
                <button className="action-btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
                    Completed
                </button>
            </div>
            <button className="action-btn" onClick={onDeleteAllTodo}>
                Clear all todos
            </button>
        </>
    )
}

export default ToolBar;