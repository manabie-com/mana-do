import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';
import { isTodoCompleted } from './utils';
import TodoItem from './components/TodoItem'
import Button from './components/Button'

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({ history }: RouteComponentProps) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            console.log(resp)
            dispatch(setTodos(resp));
            localStorage.setItem("listTodos", JSON.stringify(resp))
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
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

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
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
        <div className="ToDo__container" data-testid="todo_container">
            <h1>React To-Do List</h1>
            <div className="Todo__creation">
                <input
                    data-testid="valid-form"
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list"
                data-testid="todo_list"
            >
                {
                    showTodos.map((todo, index) => {
                        return (<TodoItem todo={todo} key={index} dispatch={dispatch} data-testid="todo_item" />
                        );
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <Button setShowing={setShowing} type={"ALL"}>
                        All
                    </Button>
                    <Button setShowing={setShowing} type={TodoStatus.ACTIVE}>
                        Active
                    </Button>
                    <Button setShowing={setShowing} type={TodoStatus.COMPLETED}>
                        Completed
                    </Button>
                </div>
                <Button setShowing={onDeleteAllTodo}>
                    Clear all todos
                </Button>
            </div>
        </div>
    );
};

export default ToDoPage;