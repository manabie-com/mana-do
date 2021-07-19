import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent
} from './store/actions';
import Service from './service';
import { Todo, TodoStatus } from './models/todo';
import { isTodoCompleted } from './utils';
import TodoCreate from './components/TodoCreate';
import TodosList from './components/TodosList';
import TodoAction from './components/TodoAction';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({ history }: RouteComponentProps) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const resp = await Service.getTodos();

                dispatch(setTodos(resp || []));
            } else {
                history.push('/');
            }
        })()
    }, [])

    const onCreateTodo = async (value: string) => {
        try {
            const resp = await Service.createTodo(value);
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

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        if (todos.length > 0) {
            const _isDelete = window.confirm(`Are you sure you want to remove all`);
            if (_isDelete) {
                dispatch(deleteAllTodos());
            }
        }
    }

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

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    const handleDeleteTodo = (todo: Todo) => {
        const _isDelete = window.confirm(`Are you sure you want to remove ${todo.content}`);
        if (_isDelete) {
            dispatch(deleteTodo(todo.id));
        }
    }
    const onChangeTodoContent = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoContent(todoId, e.target.value))
    }
    return (
        <>
            <div className="Todo__title">To Do?</div>
            <div className="ToDo__container">
                <TodoCreate
                    className="Todo__creation"
                    onCreateTodo={onCreateTodo}
                />
                <TodosList
                    todos={showTodos}
                    isDeleteRow
                    isEditRow
                    onUpdateTodoStatus={onUpdateTodoStatus}
                    onChangeTodoContent={onChangeTodoContent}
                    handleDeleteTodo={handleDeleteTodo}
                />
                <TodoAction
                    todos={todos}
                    isDeleteAll
                    activeTodos={activeTodos}
                    setShowing={setShowing}
                    onToggleAllTodo={onToggleAllTodo}
                    onDeleteAllTodo={onDeleteAllTodo}
                />
            </div>
        </>
    );
};

export default ToDoPage;