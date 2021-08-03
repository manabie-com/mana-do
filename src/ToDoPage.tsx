import React, {useEffect, useReducer, useState, useMemo} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import {Todo, TodoStatus} from './models/todo';
import {checkAuth} from './helpers/auth';

import CreateTodoForm from './components/CreateTodoForm';
import TodoList from './components/TodoList';
import TodoToolbar from './components/TodoToolbar';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({history}: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [filter, setFilter] = useState<EnhanceTodoStatus>('ALL');

    useEffect(() => {
        if (!checkAuth()) {
            history.push('/');
        }
    }, [history])

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (newTodo: string) => {
        try {
            const resp = await Service.createTodo(newTodo);
            dispatch(createTodo(resp));
        } catch (e) {
            if (e.response.status === 401) {
                history.push('/');
            }
        }
    }

    const onUpdateTodo = async (todoEdit: Todo) => {
        try {
            const resp = await Service.updateTodo(todoEdit);
            dispatch(updateTodo(resp));
        } catch (e) {
            if (e.response.status === 401) {
                history.push('/');
            }
        }
    }

    const onDeleteTodo = (todoDelete: Todo) => {
        if (!window.confirm(`Do you want to delete: ${todoDelete.content}?`)) return;
        dispatch(deleteTodo(todoDelete.id));
    }

    const onDeleteAllTodo = () => {
        if (!window.confirm('Do you want to delete all todo?')) return;

        dispatch(deleteAllTodos());
    }

    const onUpdateTodoStatus = (todoId: string, completed: boolean) => {
        dispatch(updateTodoStatus(todoId, completed));
    }

    const onToggleAllTodo = (completed: boolean) => {
        dispatch(toggleAllTodos(completed));
    }

    const showTodos = useMemo(() =>
        todos.filter((todo) => {
            switch (filter) {
                case TodoStatus.ACTIVE:
                    return todo.status === TodoStatus.ACTIVE;
                case TodoStatus.COMPLETED:
                    return todo.status === TodoStatus.COMPLETED;
                default:
                    return true;
            }
        }),
        [todos, filter],
    );

    return (
        <div className="Todo__container">
            <h1 className="Todo__title">TODO</h1>
            <CreateTodoForm
                createTodo={onCreateTodo}
            />
            <TodoList
                todos={showTodos}
                updateTodoStatus={onUpdateTodoStatus}
                deleteTodo={onDeleteTodo}
                updateTodo={onUpdateTodo}
            />
            <TodoToolbar
                todos={showTodos}
                toggleAllTodo={onToggleAllTodo}
                filter={filter}
                filterChange={newFilter => setFilter(newFilter)}
                deleteAllTodo={onDeleteAllTodo}
            />
        </div>
    );
};

export default ToDoPage;