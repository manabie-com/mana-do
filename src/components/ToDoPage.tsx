import React, {useEffect, useReducer, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import reducer, {initialState} from '../store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent
} from '../store/actions';
import Service from '../service';
import { TodoStatus } from '../models/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList'
import TodoToolbar from './TodoToolbar'

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({history}: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (todo: string) => {
        try {
            const resp = await Service.createTodo(todo);
            dispatch(createTodo(resp));
        } catch (e) {
            if (e.response.status === 401) {
                history.push('/')
            }
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onUpdateTodoContent = (todoId: string, newTodo: string) => {
        dispatch(updateTodoContent(todoId, newTodo))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onDeleteById  = (id: string ) => {
        dispatch(deleteTodo(id))
    }

    return (
        <div className="ToDo__container" data-testid="todo-page">
            <h2 style={{marginTop: 4}}>Todo List</h2>
            <TodoForm onKeyDown={onCreateTodo} />
            <TodoList
                todos={todos}
                showing={showing}
                onDelete={onDeleteById}
                onUpdateTodoContent={onUpdateTodoContent}
                onUpdateTodoStatus={onUpdateTodoStatus}
            />
            <TodoToolbar
                todos={todos}
                showing={showing}
                setShowing={setShowing}
                onToggleAllTodo={onToggleAllTodo}
                onDeleteAllTodo={onDeleteAllTodo} />
        </div>
    );
};

export default ToDoPage;