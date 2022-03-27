import React, { useState } from "react";
import { TodoStatus, Todo } from "../../models/todo";

import "./todo-toolbar.styles.css";

type EnhanceTodoStatus = TodoStatus | "ALL";
export interface ToDoToolbarProps {
    todos: Array<Todo>;
    setShowing: React.Dispatch<React.SetStateAction<EnhanceTodoStatus>>;
    onToggleAllTodo: any;
    onDeleteAllTodo: any;
}

const ToDoToolbar: React.FC<ToDoToolbarProps> = ({
    todos,
    setShowing,
    onToggleAllTodo,
    onDeleteAllTodo,
}) => {
    const [activeButton, setActiveButton] = useState({
        allBtn: true,
        activeBtn: false,
        completedBtn: false,
    });

    const onCheckboxToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggleAllTodo(e.target.checked);
        localStorage.setItem(
            "toggleIsChecked",
            JSON.stringify(e.target.checked)
        );
    };

    const onDeleteClick = () => {
        onDeleteAllTodo();
        localStorage.setItem("toggleIsChecked", JSON.stringify(false));
        setShowing("ALL");
        setActiveButton({
            allBtn: true,
            activeBtn: false,
            completedBtn: false,
        });
    };

    const isChecked = JSON.parse(
        localStorage.getItem("toggleIsChecked") || "false"
    );

    const onSetShowing = (id: string, status: EnhanceTodoStatus) => {
        setShowing(status);

        if (id === "allBtn") {
            setActiveButton({
                allBtn: true,
                activeBtn: false,
                completedBtn: false,
            });
        } else if (id === "completedBtn") {
            setActiveButton({
                allBtn: false,
                activeBtn: false,
                completedBtn: true,
            });
        } else {
            setActiveButton({
                allBtn: false,
                activeBtn: true,
                completedBtn: false,
            });
        }
    };
    return (
        <div className="Todo__toolbar">
            {todos.length > 0 ? (
                <input
                    className="ToDo__checkbox"
                    type="checkbox"
                    checked={isChecked}
                    onChange={onCheckboxToggle}
                />
            ) : (
                <div />
            )}
            <div className="Todo__tabs">
                <button
                    className={`Action__btn__secondary ${
                        activeButton["allBtn"] ? "btn__is__active" : ""
                    }`}
                    onClick={() => {
                        onSetShowing("allBtn", "ALL");
                    }}
                >
                    All
                </button>
                <button
                    className={`Action__btn__primary ${
                        activeButton["activeBtn"] ? "btn__is__active" : ""
                    }`}
                    onClick={() => onSetShowing("activeBtn", TodoStatus.ACTIVE)}
                >
                    Active
                </button>
                <button
                    className={`Action__btn__success ${
                        activeButton["completedBtn"] ? "btn__is__active" : ""
                    }`}
                    onClick={() =>
                        onSetShowing("completedBtn", TodoStatus.COMPLETED)
                    }
                >
                    Completed
                </button>
            </div>
            <button className="Action__btn__danger" onClick={onDeleteClick}>
                Clear all todos
            </button>
        </div>
    );
};

export default ToDoToolbar;
