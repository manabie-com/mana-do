import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from 'store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updatedItem
} from 'store/actions';
import Service from 'service';
import { TodoStatus, UpdatedTodo, UpdatedTodoStatus } from 'models/todo';
import { isTodoCompleted } from 'utils';

import 'pages/todo/index.css'
import ButtonField from 'components/button/ButtonField';

type EnhanceTodoStatus = TodoStatus | 'ALL';
type ItemEditing = string
type TextChange = string
type EventClickOut = boolean

const ToDoPage = ({ history }: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [isEditted, setIsEditted] = useState<ItemEditing>('');
    const [text, setText] = useState<TextChange>('');
    const [clickOut, setClickOut] = useState<EventClickOut>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    useEffect(() => {
        if (clickOut) {
            setText('')
            setIsEditted('')
        }
    }, [clickOut, setText, setIsEditted])

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
    const onUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
        if (e.key === 'Enter' && text) {
            try {
                const resp: UpdatedTodo = await Service.updateTodo(id, text);
                dispatch(updatedItem(resp));
                setClickOut(true)
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        } else {
            setClickOut(false)
            setText(e.currentTarget.value)
        }
    }

    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        const resp: UpdatedTodoStatus = await Service.updateTodoStatus(todoId, e.target.checked);
        dispatch(updateTodoStatus(resp.id, resp.checked));
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

    const renderTodo = (i: number) => {
        if (isEditted && todos[i].id === isEditted) {
            return (
                <input
                    defaultValue={todos[i].content}
                    type='text'
                    onKeyUp={e => onUpdateTodo(e, todos[i].id)}
                />
            )
        }

        return <span onDoubleClick={() => setIsEditted(todos[i].id)}>{todos[i].content}</span>
    }

    return (
        <div className="ToDo__container" onClick={() => setClickOut(true)}>
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={e => onCreateTodo(e)}
                />
            </div>
            <div className="ToDo__list">
                {
                    showTodos.map((todo, index) => {
                        return (
                            <div key={todo.id} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                {renderTodo(index)}
                                <ButtonField className="Todo__delete" label="X" onClick={() => dispatch(deleteTodo(todo.id))} />
                            </div>
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
                    <ButtonField className="Action__btn" label="All" onClick={() => setShowing('ALL')} />
                    <ButtonField className="Action__btn" label="Active" onClick={() => setShowing(TodoStatus.ACTIVE)} />
                    <ButtonField className="Action__btn" label="Completed" onClick={() => setShowing(TodoStatus.COMPLETED)} />
                </div>
                <ButtonField className="Action__btn" label="Clear all todos" onClick={onDeleteAllTodo} />
            </div>
        </div>
    );
};

export default ToDoPage;