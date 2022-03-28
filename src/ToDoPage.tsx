import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoContent,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';
import { useForm, SubmitHandler } from "react-hook-form";

type EnhanceTodoStatus = TodoStatus | 'ALL';

type IFormInput = {
    content: string,
};

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [editItemId, setEditItemId] = useState<string>('');
    const { register, handleSubmit, setValue, watch, setFocus, formState: { errors }, reset } = useForm<IFormInput>();

    useEffect(() => {
        (async () => {
            let storageTodo = localStorage.getItem('todos')
            if(storageTodo){
                dispatch(setTodos(JSON.parse(storageTodo)));
            } else {
                const resp = await Service.getTodos();
                dispatch(setTodos(resp || []));
            }
        })()
    }, [])

    useEffect(() => {
        if(todos.length > 0){
            localStorage.setItem('todos',JSON.stringify(todos))
        } else {
            localStorage.removeItem('todos')
        }
    }, [todos])

    const onSubmit = async (data: IFormInput) => {
        if (editItemId.length === 0) {
            const resp = await Service.createTodo(data.content);
            dispatch(createTodo(resp));
            console.log(resp)
        } else {
            console.log(data.content)
            dispatch(updateTodoContent(editItemId, data.content));
        }
        reset();
        setEditItemId('');
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, showing === TodoStatus.ACTIVE ? e.target.checked: !e.target.checked))
    }

    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onItemClick = (content: string, todoId: string) => {
        setValue('content', content)
        setEditItemId(todoId)
        setFocus("content");
    }


    return (
        <div className="ToDo__container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="Todo__creation">
                    <input
                        {...register("content", { required: true })}
                        className="Todo__input"
                        placeholder="What need to be done?"
                        maxLength={100}
                    />
                </div>
                {errors.content && <span>This field is required</span>}
            </form>
            <div className="ToDo__list">
                {
                    todos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                 <input
                                    type="checkbox"
                                    checked={showing === todo.status}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                    disabled={showing === "ALL"}
                                />
                                <span
                                    title='click to edit todo'
                                    onClick={(e) => onItemClick(todo.content, todo.id)}
                                >{todo.id === editItemId ? 'Editing...' : todo.content}</span>
                                <button
                                    className="Todo__delete"
                                    onClick={() => onDeleteTodo(todo.id)}
                                >
                                    X
                                </button>
                            </div>
                        );
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        disabled={showing === "ALL"}
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className={`Action__btn ${showing === "ALL" && "Action__btn__active"}`} onClick={() => setShowing("ALL")}>
                        All
                    </button>
                    <button className={`Action__btn ${showing === TodoStatus.ACTIVE && "Action__btn__active"}`} onClick={() => setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className={`Action__btn ${showing === TodoStatus.COMPLETED && "Action__btn__active"}`} onClick={() => setShowing(TodoStatus.COMPLETED)}>
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