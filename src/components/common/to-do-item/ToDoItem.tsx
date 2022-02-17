import classNames from "classnames";
import { FC } from "react";
import { Todo, TodoStatus } from "../../../models/todo";
import { updateTodoStatus, deleteTodo } from "../../../store/actions";
import Service from '../../../service';
import { isTodoCompleted } from "../../../utils";
import { toast } from "react-toastify";

interface ToDoItemProps {
    todo: Todo;
    dispatch: Function;
}

const ToDoItem: FC<ToDoItemProps> = ({ todo, dispatch }) => {
    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        const { ACTIVE, COMPLETED } = TodoStatus;
        const status = todo.status === ACTIVE ? COMPLETED : ACTIVE;
        Service.editTodo(todo.content, status, todo.id);
        dispatch(updateTodoStatus(todoId, e.target.checked));
        toast.success(`task status updated!`)
    }

    const onUpdateTodoContent = (e: React.ChangeEvent<HTMLSpanElement>, todoId: any) => {
        Service.editTodo(e.target.innerText, todo.status, todo.id);
        dispatch(updateTodoStatus(todoId, isTodoCompleted(todo)))
        toast.success(`task content updated!`)
    }

    const onDeleteTodo = (todoId: string) => {
        Service.deleteTodo(todo.id);
        dispatch(deleteTodo(todoId));
        toast.success(`task deleted!`)
    }

    return (
        <div className="to-do__item">
            <input
                type="checkbox"
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <span title={todo.content} className={classNames("to-do__item-content")}>
                <span onBlur={e => onUpdateTodoContent(e, todo.id)} contentEditable suppressContentEditableWarning={true} className={classNames({ "strike": todo.status === TodoStatus.COMPLETED })}>{todo.content}</span>
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