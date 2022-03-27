import React, { useEffect, useReducer, useState } from "react";

import reducer, { initialState } from "../../store/reducer";
import {
    setTodos,
    filterTodo,
    createTodo,
    updateTodoStatus,
    deleteTodo,
    updateTodo,
    toggleAllTodos,
    deleteAllTodos,
} from "../../store/actions";
import Service from "../../service";

import ToDoCreate from "../todo-create/todo-create.component";
import ToDoItem from "../todo-item/todo-item.component";
import ToDoToolbar from "../todo-toolbar/todo-toolbar.component";
import { TodoStatus } from "../../models/todo";

type EnhanceTodoStatus = TodoStatus | "ALL";
const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos") || "{}");
        dispatch(setTodos(todos));
    }, []);

    useEffect(() => {
        dispatch(filterTodo(showing));
    }, [showing]);

    const onCreateTodo = async (todo: string) => {
        const resp = await Service.createTodo(todo);
        dispatch(createTodo(resp));
        dispatch(filterTodo(showing));
    };

    const onUpdateTodoStatus = (todoId: string, isChecked: boolean) => {
        dispatch(updateTodoStatus(todoId, isChecked));
    };

    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId));
    };

    const onUpdateTodo = (todo: string, todoId: number) => {
        dispatch(updateTodo(todo, todoId));
    };

    const onToggleAllTodo = (isChecked: boolean) => {
        dispatch(toggleAllTodos(isChecked));
    };

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    };

    return (
        <div className="ToDo__container">
            <ToDoCreate onCreateTodo={onCreateTodo} />
            <div className="ToDo__list">
                {todos.map((todo, index) => {
                    return (
                        <ToDoItem
                            todo={todo}
                            idx={index}
                            key={index}
                            onUpdateTodoStatus={onUpdateTodoStatus}
                            onDeleteTodo={onDeleteTodo}
                            onUpdateTodo={onUpdateTodo}
                        />
                    );
                })}
            </div>
            <ToDoToolbar
                todos={todos}
                setShowing={setShowing}
                onToggleAllTodo={onToggleAllTodo}
                onDeleteAllTodo={onDeleteAllTodo}
            />
        </div>
    );
};

export default ToDoPage;
