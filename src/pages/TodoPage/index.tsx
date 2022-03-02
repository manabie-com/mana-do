import React, { useEffect, useReducer, useRef, useState } from "react";
import './index.css';

import reducer, { initialState } from "store/reducer";
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent,
    deleteTodo,
} from "store/actions";
import Service from "service";
import { TodoStatus } from "models/todo";
import { TodoInput, ToDoToolbar, TodoItem } from "components";

type EnhanceTodoStatus = TodoStatus | "ALL";

export const TodoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
    const inputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })();
    }, []);

    const onCreateTodo = async (content: string) => {
        const resp = await Service.createTodo(content);
        dispatch(createTodo(resp));
    };

    const onUpdateTodoStatus = (
        status: boolean,
        todoId: any
    ) => {
        dispatch(updateTodoStatus(todoId, status));
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

    const onEditingTodo = (newContent: string, todoId: string) => {
        dispatch(updateTodoContent(todoId, newContent));
    };

    return (
        <div className="ToDo__container disable-select">
            <TodoInput
                inputRef={inputRef}
                _onCreateTodo={onCreateTodo}
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
                                key={index}
                                index={index}
                                todo={todo}
                                onUpdateTodoStatus={onUpdateTodoStatus}
                                onEditingTodo={onEditingTodo}
                                onDeleteTodo={onDeleteTodo}
                            />
                        )
                    );
                })}
            </div>
        </div>
    );
};
