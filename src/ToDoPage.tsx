import React, {useEffect, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import {isTodoCompleted} from './utils';
import ToDoItem from "./component/ToDoItem";
import ToDoToolbar from "./component/ToDoToolbar";

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({history}: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Checking user type something into input
        if (e.key === 'Enter' && inputRef.current && inputRef.current.value !== '') {
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

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId));
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
        <div className="form todos">
            <div className="form-header container-fluid">
                <div className="row container__main form-header__content ">
                    <div className="other_height"></div>
                </div>
            </div>
            <div className="form-logo">
                <div className="form-logo__bg">
                    <div className="form-logo__title">
                        <span>TODOS</span>
                    </div>
                </div>
            </div>
            <div className="container__form todos-form">
                <div className="other_title">Your life is well-balanced!</div>
                <div className="form-group todos-input_typing">
                    <input
                        ref={inputRef}
                        className="form-control"
                        placeholder="What need to be done?"
                        onKeyDown={onCreateTodo}
                    />
                </div>
            <ToDoToolbar todos={todos} activeTodos={activeTodos}
                         showing={showing} setShowing={setShowing}
                         onDeleteAllTodo={onDeleteAllTodo} onToggleAllTodo={onToggleAllTodo}/>
            <div className="todos-list">
                {
                    showTodos.map((todo, index) => {
                        return (
                            <ToDoItem key={index} todo={todo} dispatch={dispatch}
                                      onUpdateTodoStatus={onUpdateTodoStatus} onDeleteTodo={onDeleteTodo}/>
                        );
                    })
                }
            </div>
            </div>
        </div>
    );
};

export default ToDoPage;
