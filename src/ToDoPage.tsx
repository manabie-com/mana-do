import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";
import { isTodoCompleted } from "./utils";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
    const inputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })();
    }, []);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
        }
    };

    const onUpdateTodoStatus = async (e: any, todoId: number) => {
        await dispatch(updateTodoStatus(String(todoId), e.target.checked));
    };

    const onToggleAllTodo = (e: any) => {
        dispatch(toggleAllTodos(e.target.checked));
    };

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    };

    const showTodos = todos.filter((todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {showTodos.map((todo, index) => {
                    return (
                        <div key={index} className="ToDo__item">
                            <input
                                type="checkbox"
                                checked={isTodoCompleted(todo)}
                                onChange={(e) => onUpdateTodoStatus(e, index)}
                            />
                            <span>{todo.content}</span>
                            <button className="Todo__delete">X</button>
                        </div>
                    );
                })}
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ? (
                    <input type="checkbox" onChange={onToggleAllTodo} />
                ) : (
                    <div />
                )}
                <div className="Todo__tabs">
                    <button
                        className="Action__btn"
                        onClick={() => setShowing("ALL")}
                    >
                        All
                    </button>
                    <button
                        className="Action__btn"
                        onClick={() => setShowing(TodoStatus.ACTIVE)}
                    >
                        Active
                    </button>
                    <button
                        className="Action__btn"
                        onClick={() => setShowing(TodoStatus.COMPLETED)}
                    >
                        Completed
                    </button>
                </div>
                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;
