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
    updateTodo
} from './store/actions';
import Service from './service';
import { Todo, TodoStatus } from './models/todo';
import { isTodoCompleted } from './utils';
import { useSelector } from 'react-redux';
import TodoItem from './components/Todo';
import TodoTabbar from './components/TodoToolBar';
import TodoForm from './components/TodoForm';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({ history }: RouteComponentProps) => {
    const todosList = useSelector((state: typeof initialState) => state)
    const [{ todos }, dispatch] = useReducer(reducer, todosList);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    //Edit box looks like new Todo Box but with different things
    const editHandler = () => {
        setEdit(!edit);
    }

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

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const deleteSelectedTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId))
    }
    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onEditTodoHandler = (todoId: string, content: string) => {
        dispatch(updateTodo(todoId, content));
    }
    const onShowingTodos = (todoStatus: EnhanceTodoStatus) => {
        setShowing(todoStatus);
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

    // const activeTodos = todos.reduce(function (accum, todo) {
    //     return isTodoCompleted(todo) ? accum : accum + 1;
    // }, 0);

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                {
                    <input
                        ref={inputRef}
                        className="Todo__input"
                        placeholder="What need to be done?"
                        onKeyDown={onCreateTodo}
                    />
                }

            </div>
            {/* <TodoForm
                // edit={edit}
                onCreateTodo={onCreateTodo}
                onUpdateTodo={onEditTodoHandler}
            /> */}
            <div className="ToDo__list">
                {
                    showTodos.map((todo, index) => {
                        return (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                isTodoCompleted={isTodoCompleted}
                                onUpdateTodoStatus={onUpdateTodoStatus}
                                deleteTodo={deleteSelectedTodo}
                                updateTodo={onEditTodoHandler}
                            // editHandler={editHandler}
                            />
                        )
                    })
                }
            </div>
            <TodoTabbar
                todos={todos}
                isTodoCompleted={isTodoCompleted}
                onDeleteAllTodo={onDeleteAllTodo}
                onToggleAllTodo={onToggleAllTodo}
                onShowingTodos={onShowingTodos}
            />
        </div>
    );
};

export default ToDoPage;