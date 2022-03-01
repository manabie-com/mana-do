import React, { useEffect, useReducer, useRef, useState } from "react";
import './TodoPage.css';

import reducer, { initialState } from "../store/reducer";
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent,
    deleteTodo,
} from "../store/actions";
import Service from "../service";
import { TodoStatus } from "../models/todo";
import { ToDoInput, ToDoToolbar, TodoItem } from "components";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
    const inputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            console.log("resp", resp);
            dispatch(setTodos(resp || []));
        })();
    }, []);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
        }
    };

    const onUpdateTodoStatus = (
        e: React.ChangeEvent<HTMLInputElement>,
        todoId: any
    ) => {
        dispatch(updateTodoStatus(todoId, e.target.checked));
    };

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked));
    };

    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId));
    };

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    };

    const onEditTodo = (e: any, todoId: any) => {
        e.target.removeAttribute("readOnly");
    };

    const onUpdateTodo = (e: any, todoId: any) => {
        e.target.setAttribute("readOnly", "readOnly");
    };

    const onEditingTodo = (e: any, todoId: any) => {
        dispatch(updateTodoContent(todoId, e.target.value));
    };

    return (
        <div className="ToDo__container disable-select">
            <ToDoInput
                inputRef={inputRef}
                onCreateTodo={onCreateTodo}
            />

            <div className="legend-bar">
                <div className="legend-bar-item todo-color-active"></div>
                <div className="legend-bar-item todo-color-complete"></div>
            </div>

            <ToDoToolbar
                todoLength={todos.length}
                showing={showing}
                onToggleAllTodo={onToggleAllTodo}
                onDeleteAllTodo={onDeleteAllTodo}
                onSetShowing={setShowing}
            />
            <div className="ToDo__list">
                {todos.map((todo, index) => {
                    return (
                        (showing === todo.status || showing === "ALL") && (
                            <TodoItem
                                index={index}
                                todo={todo}
                                onUpdateTodoStatus={onUpdateTodoStatus}
                                onUpdateTodo={onUpdateTodo}
                                onEditingTodo={onEditingTodo}
                                onEditTodo={onEditTodo}
                                onDeleteTodo={onDeleteTodo}
                            />
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default ToDoPage;
