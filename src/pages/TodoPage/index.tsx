import React, { useEffect, useReducer, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { setTodos } from '../../store/actions';
import { Todo, TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import TodoItem from './TodoItem';
import Service from '../../service';
import MyButton from '../../shared/components/MyButton';
import MyInputField from '../../shared/components/MyInputField';
import todoService from '../../service/todo.service';
import userService from '../../service/user.service';
import { AxiosError } from 'axios';
import { MESSAGE, ROUTE } from '../../shared/constant';
import reducer, { initialState } from '../../store/reducer';
import './index.scss';
import TodoTab from './TodoTab';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({ history }: RouteComponentProps) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [input, setInput] = useState('');

    useEffect(() => {
        // refactor action get todo items
        getTodo();
    }, []);

    const getTodo = async () => {
        const todoItems = await Service.getTodos();
        dispatch(setTodos(todoItems));
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input) {
            // I think FE shouldn't handle try catch here, 
            // just implement the action after the process of service class done
            const result = await todoService.createTodo(input) as Todo;
            if (result?.id) {
                setInput("");
                getTodo();
            } else if ((result as unknown as AxiosError)?.response?.status === 401) {
                userService.resetToken();
                history.push(ROUTE.SIGN_IN_PAGE);
            }
        }
    }

    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        const response = await todoService.updateTodoStatus(todoId, e.target.checked);
        response && getTodo();
    }

    const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const response = await todoService.toggleAllTodo(e.target.checked);
        response && getTodo();
    }

    const onDeleteAllTodo = async () => {
        // should show alert confirmation
        const confirm = window.confirm(MESSAGE.DELETE_ALL_TODO);
        if (confirm) {
            await Service.deleteAllTodo();
            getTodo();
        }
    }

    const onDeleteTodo = async (id: string) => {
        if (id) {
            // should show alert confirmation
            const confirm = window.confirm(MESSAGE.DELETE_TODO);
            if (confirm) {
                const response = await Service.deleteTodo(id);
                response && getTodo();
            }
        }
    }

    const onUpdateTodo = async (id: string, content: string) => {
        if (id && content) {
            const response = await todoService.updateTodo(id, content);
            response && getTodo();
        }
    }

    const signOut = () => {
        userService.resetToken();
        history.push(ROUTE.SIGN_IN_PAGE);
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

    return (
        <div className="container">
            <div className='sign-out-content'>
                <span className='btn-sign-out' onClick={() => signOut()}>Sign Out</span>
            </div>
            <MyInputField
                value={input}
                placeholder="What need to be done?"
                onKeyDown={onCreateTodo}
                onChange={onChangeInput}
            />
            <div className="list-todo">
                {
                    showTodos?.map((todo, index) =>
                        <TodoItem
                            {...todo}
                            key={index}
                            onDeleteTodo={onDeleteTodo}
                            onUpdateTodoStatus={onUpdateTodoStatus}
                            onUpdateTodo={onUpdateTodo}
                        />
                    )
                }
            </div>
            <div className="toolbar">
                {
                    todos.length > 0 ?
                        <MyInputField
                            type="checkbox"
                            checked={activeTodos === 0}
                            onChange={onToggleAllTodo}
                        /> : <div />
                }
                <TodoTab setShowing={setShowing} />
                <MyButton label='Clear all todos' onClick={onDeleteAllTodo} />
            </div>
        </div>
    );
};

export default ToDoPage;