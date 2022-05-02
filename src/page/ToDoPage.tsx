import React, { useEffect, useReducer, useState } from 'react';
import reducer, { initialState } from '../store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from '../store/actions';
import Service from '../service';
import { TodoStatus } from '../models/todo';
import Button from '../components/Button';
import Input from '../components/Input';
import TodoItem from '../components/TodoItem';
import Checkbox from '../components/Checkbox';

type EnhanceTodoStatus = TodoStatus | TodoStatus.ALL;


const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>(TodoStatus.ALL);
    const [enteredTodo, setEnteredTodo] = useState("") as any

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (enteredTodo.trim().length > 0) {
            } console.log(enteredTodo)
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }


    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <Input value={enteredTodo} className="Todo__input" onChange={(e) => setEnteredTodo(e.target.value)} placeholder="What need to be done?" onKeyDown={onCreateTodo} />
            </div>
            <div className="ToDo__list">
                {
                    todos.map((todo, index) => {
                        return (
                            <TodoItem index={index} todo={todo} isShown={showing} onChange={onUpdateTodoStatus} />
                        );
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 &&
                    <Checkbox onChange={onToggleAllTodo} index={-1} />}
                <div className="Todo__tabs">
                    <Button title="All" />
                    <Button title="Active" onClick={() => setShowing(TodoStatus.ACTIVE)} />
                    <Button title="Completed" onClick={() => setShowing(TodoStatus.COMPLETED)} />
                </div>
                <Button title="Clear all todos" onClick={onDeleteAllTodo} />
            </div>
        </div>
    );
};

export default ToDoPage;