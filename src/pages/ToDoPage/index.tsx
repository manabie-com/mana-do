import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from '../../store/reducer';
import {
    setTodos,
    createTodo,
    editTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import AddTodo from '../../components/addTodo';
import TodosList from '../../components/listTodos';
import './style.css';
import Button from '../../components/buttons';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({ history }: RouteComponentProps) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>, inputRef: React.RefObject<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                inputRef.current.value = '';
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    const onEditTodo = async (e: React.KeyboardEvent<HTMLInputElement>, todoId: string, inputVal: string) => {
        if (e.key === 'Enter' && inputVal) {
            try {
                const resp = await Service.editTodo(todoId, inputVal);
                dispatch(editTodo(resp));
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked));
        window.location.reload();
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
        window.location.reload();
    }

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    const onClickBtn = (action: string) => {
        if (action == 'all')
            return setShowing('ALL');

        if (action == 'active')
            return setShowing(TodoStatus.ACTIVE);

        if (action == 'completed')
            return setShowing(TodoStatus.COMPLETED);
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId));
    }

    return (
        <div className="TodoPage">
            <div className="ToDo__container">
                <AddTodo inputRefProp={inputRef} onCreateTodo={onCreateTodo} />
                <TodosList
                    todosList={todos}
                    showing={showing}
                    onUpdateTodoStatus={onUpdateTodoStatus}
                    onDeleteTodo={onDeleteTodo}
                    onEditTodo={onEditTodo}
                />
                <div className="Todo__toolbar">
                    {todos.length > 0 ?
                        <input
                            type="checkbox"
                            checked={activeTodos === 0}
                            onChange={onToggleAllTodo}
                        /> : <div />
                    }
                    <div className="Todo__tabs">
                        <Button typeBtn="button" textBtn="All" styleBtn="all" onClick={onClickBtn} />
                        <Button typeBtn="button" textBtn="Active" styleBtn="active" onClick={onClickBtn} />
                        <Button typeBtn="button" textBtn="Completed" styleBtn="completed" onClick={onClickBtn} />
                    </div>
                    <Button typeBtn="button" textBtn="Clear all todos" styleBtn="clear" onClick={onDeleteAllTodo} />
                </div>
            </div>
        </div>
    );
};

export default ToDoPage;