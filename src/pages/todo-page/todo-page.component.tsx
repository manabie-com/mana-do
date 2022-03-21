import React, { useEffect, useReducer, useState } from 'react';

import reducer, { initialState } from '../../store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodo,
    deleteTodo,
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { TodoInput } from '../../components/todo-input/todo-input.component';
import { TodoItem } from '../../components/todo-item/todo-item.component';
import { TodoToolbar } from '../../components/todo-toolbar/todo-toolbar.component';
import './todo-page.style.css'
type EnhanceTodoStatus = TodoStatus | 'ALL';



const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])


    useEffect(() => {
        window.localStorage.setItem("todolist", JSON.stringify(todos));
    })



    const onCreateTodo = async (value: string) => {
        const resp = await Service.createTodo(value);
        dispatch(createTodo(resp));
    }

    const onUpdateTodo = async (e: any, todoId: any) => {
        dispatch(updateTodo(todoId, e.target.value))
    }

    const onDeleteTodo = async (todoId: string) => {
        dispatch(deleteTodo(todoId))
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

    const filteredTodos = todos.filter((todo) => {
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
        <div className='ToDo__wrapper'>
            <h1 className='ToDo__title'> To-do list ✏️</h1>
            <div className="ToDo__container">
                <TodoInput onCreateTodo={onCreateTodo} ></TodoInput>

                <div className="ToDo__list">
                    {
                        filteredTodos.map((todo, index) => {
                            return (
                                <TodoItem onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} index={index} todo={todo} onUpdateTodoStatus={onUpdateTodoStatus} key={todo.id} />
                            );
                        })
                    }
                </div>
                <TodoToolbar setShowing={setShowing} onDeleteAllTodo={onDeleteAllTodo} onToggleAllTodo={onToggleAllTodo} todos={todos} showingStatus={showing}></TodoToolbar>
            </div>
        </div>
    );
};

export default ToDoPage;