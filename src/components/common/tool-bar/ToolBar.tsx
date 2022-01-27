import classNames from "classnames";
import { FC } from "react";
import { Todo, TodoStatus } from "../../../models/todo";

interface ToolBarProps {
    todos: Array<Todo>;
    onToggleAllTodo: Function;
    setShowing: Function;
    onDeleteAllTodo: Function;
}

const ToolBar: FC<ToolBarProps> = ({ todos, onToggleAllTodo, setShowing, onDeleteAllTodo }) => {
    return (
        <>
            <input
                className={classNames("to-do__check-all-btn", { "to-do__check-all-btn--hidden": !todos.length })}
                type="checkbox"
                onChange={e => onToggleAllTodo(e)}
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
            <button className="action-btn" onClick={e => onDeleteAllTodo(e)}>
                Clear all todos
            </button>
        </>
    )
}

export default ToolBar;