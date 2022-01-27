import classNames from "classnames";
import { FC } from "react";
import { Todo, TodoStatus } from "../../../models/todo";

interface ToDoItemProps {
    todo: Todo;
    onUpdateTodoStatus: Function;
    onDeleteTodo: Function;
}

const ToDoItem: FC<ToDoItemProps> = ({ todo, onUpdateTodoStatus, onDeleteTodo }) => {

    return (
        <div className="to-do__item">
            <input
                type="checkbox"
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <span title={todo.content} className={classNames("to-do__item-content")}>
                <span contentEditable className={classNames({ "strike": todo.status === TodoStatus.COMPLETED })}>{todo.content}</span>
            </span>
            <button
                onClick={() => onDeleteTodo(todo.id)}
                className="to-do__delete"
            >
                X
            </button>
        </div>
    )
}

export default ToDoItem;