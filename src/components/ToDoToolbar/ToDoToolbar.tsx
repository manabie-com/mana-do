import { useEffect, useRef } from "react";
import { Toolbar, ToolbarTabs, ActionButton } from "./styles";
import {ToDoToolbarProps } from "./types";
import { StyledInput } from "./styles";
import { TodoStatus } from "../../types/types";
import { ButtonLabels } from "./constants";
import { checkToDoStatus } from "../utils";
import { getActiveToDos } from "./utils";

const ToDoToolbar = ({ todos, onSetShowing, onToggleAllTodo, onDeleteAllTodo }: ToDoToolbarProps) => {
    const checkboxRef = useRef<HTMLInputElement>(null);
    const onHandleClick = (toDoStatus: TodoStatus) => () => onSetShowing(toDoStatus);

    useEffect(() => {
        if (!checkboxRef.current) return;
        if (!checkToDoStatus() && getActiveToDos(todos).length < todos.length) checkboxRef.current.indeterminate = true; // set indeterminate to true, this will show checkbox like this [-] if some of the todos are completed.
        else checkboxRef.current.indeterminate = false; // set indeterminate to false if all todos are completed or all todos are in active status. this will remove [-] in checkbox.
    }, [todos]);

    return (
        <Toolbar>
            { todos.length ? <StyledInput ref={checkboxRef} type="checkbox" checked={checkToDoStatus()} onChange={onToggleAllTodo} /> : <div/> }
            <ToolbarTabs>
                <ActionButton>{ ButtonLabels.ALL }</ActionButton>
                <ActionButton onClick={onHandleClick(TodoStatus.ACTIVE)}>{ ButtonLabels.ACTIVE }</ActionButton>
                <ActionButton onClick={onHandleClick(TodoStatus.COMPLETED)}>{ ButtonLabels.COMPLETED }</ActionButton>
            </ToolbarTabs>
            <ActionButton onClick={onDeleteAllTodo}>{ ButtonLabels.CLEAR_ALL_TODOS }</ActionButton>
        </Toolbar>
    );
};

export default ToDoToolbar;
