import React, { useState, useRef } from "react";
import { Todo } from "../../models/todo";
import {
    AppActions,
    updateTodoStatus,
    deleteTodo,
    updateTodo,
} from "../../store/actions";
import { FaTrash } from "react-icons/fa";

import "./todo-item.styles.css";
import { isTodoCompleted } from "../../utils";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";

export interface ToDoListProps {
    todo: Todo;
    idx: number;
    onUpdateTodoStatus: any;
    onDeleteTodo: any;
    onUpdateTodo: any;
}

const ToDoList: React.FC<ToDoListProps> = ({
    todo,
    idx,
    onUpdateTodoStatus,
    onDeleteTodo,
    onUpdateTodo,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("");
    const inputRef = useRef<any>(null);

    const onCheckBoxToggle = (
        e: React.ChangeEvent<HTMLInputElement>,
        todoId: string
    ) => {
        onUpdateTodoStatus(todoId, e.target.checked);
    };

    const onDeleteClick = (todoId: string) => {
        onDeleteTodo(todoId);
    };

    const onHandleTodoClick = () => {
        setIsEditing(true);
    };

    const onUpdateKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        todoId: any
    ) => {
        if (e.key === "Enter") {
            if (value === "") return;
            onUpdateTodo(value, todoId);
            setIsEditing(false);
            setValue("");
        }
    };

    useOnOutsideClick(inputRef, () => {
        setIsEditing(false);
    });
    return (
        <>
            {todo.show && (
                <div
                    key={idx}
                    className="ToDo__item"
                    onDoubleClick={onHandleTodoClick}
                >
                    <input
                        className="ToDo__checkbox"
                        type="checkbox"
                        checked={isTodoCompleted(todo)}
                        onChange={(e) => onCheckBoxToggle(e, todo.id)}
                    />
                    {isEditing ? (
                        <input
                            type="text"
                            className="ToDo__edit"
                            defaultValue={todo.content}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => onUpdateKeyDown(e, todo.id)}
                            ref={inputRef}
                            autoFocus
                        />
                    ) : (
                        <span>{todo.content}</span>
                    )}
                    <button
                        className="Todo__delete"
                        onClick={() => onDeleteClick(todo.id)}
                    >
                        <FaTrash />
                    </button>
                </div>
            )}
        </>
    );
};

export default ToDoList;
