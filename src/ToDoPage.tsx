import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    // setTodos,
    createTodo,
    // toggleAllTodos,
    // deleteAllTodos,
    updateTodoStatus,
    updateTodo,
    setData
} from './store/actions';
import Service from './service';
import { Todo, TodoStatus } from './models/todo';
import './ToDoPage.css';
import moment from 'moment';

// type EnhanceTodoStatus = TodoStatus | 'ALL';

function useOutsideAlerter(ref: any, fuc: Function) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                fuc()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


const TodoItem = (props: any) => {
    const wrapperRef = useRef(null);

    const { todo, type, onDrop, onDragStart, onDragEnd, onDragOver, dispatch } = props

    const [isEditContent, setIsEditContent] = useState<Boolean>(false)
    const [contentTodo, setContentTodo] = useState<any>(todo.content)

    const functionClickOutSide = () => setIsEditContent(false)

    useOutsideAlerter(wrapperRef, functionClickOutSide);

    const onUpdateTodo = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && contentTodo != '') {
            const resp = await Service.updateTodo(todo, contentTodo);
            dispatch(updateTodo(resp))
            setIsEditContent(false)
        }
    }

    return (
        <div ref={wrapperRef} id={todo.id} title={type} className='task__item' onDrop={event => onDrop(event, type, todo)} onDragStart={event => onDragStart(event, type, todo)} onDragEnd={event => onDragEnd(event, type, todo)} onDragOver={event => onDragOver(event, type, {})} draggable onDoubleClick={() => setIsEditContent(true)}>
            {isEditContent ?
                <input
                    value={contentTodo}
                    onChange={event => setContentTodo(event.target.value)}
                    className="todo__input_edit"
                    placeholder="What need to be done?"
                    onKeyDown={event => onUpdateTodo(event)}
                    autoFocus
                />
                :
                <div className='item__content'>
                    {todo.content}
                </div>
            }
            <div className={`item__time ${type}`}>
                {moment(todo.created_date).format("DD/MM/YYYY")}
            </div>
        </div>)
}

const ToDoPage = () => {
    const [reducerState, dispatch] = useReducer(reducer, initialState);
    // const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

    const [todoWillUpdate, setTodoWillUpdate] = useState<any>()

    const {
        todos = [],
        todosDoing = [],
        todosUrgent = [],
        todosDonot = [],
        todosDone = [],
        todosRemoved = []
    } = reducerState

    useEffect(() => {
        (async () => {
            const resp = await Service.getData();
            dispatch(setData(resp || reducerState));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current.value != '') {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp))
            inputRef.current.value = ""
        }
    }

    // const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any, statusOld: string, statusNew: string) => {
    //     // dispatch(updateTodoStatus(todoId, statusOld, statusNew))
    // }

    // const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     dispatch(toggleAllTodos(e.target.checked))
    // }

    // const onDeleteAllTodo = () => {
    //     dispatch(deleteAllTodos());
    // }

    const onDrop = (event: any, type: string, todo: Todo) => {
        event.preventDefault();
        dispatch(updateTodoStatus({ ...todoWillUpdate.todo, status: type }, todoWillUpdate.type, event.target.title))
    }

    const onDragOver = (event: any, type: string, todo: Todo) => {
        event.preventDefault();
    }
    const onDragStart = (event: any, type: string, todo: Todo) => {
        if (todo.id) {
            setTodoWillUpdate({ todo: todo, type: type })
        }
    }
    const onDragEnd = (event: any, type: string, todo: Todo) => {
    }
    return (
        <div className='todo__page'>
            {
                [
                    { task: 'do', data: todos },
                    { task: 'doing', data: todosDoing },
                    { task: 'urgent', data: todosUrgent },
                    { task: 'donot', data: todosDonot },
                    { task: 'done', data: todosDone },
                    { task: 'removed', data: todosRemoved }
                ].map(element =>
                    <div className='todo__task'>
                        <div className='task__title'>{element.task}</div>
                        <div className='task__content'>
                            {
                                element.data.map((todo, index) => <TodoItem key={todo.id} dispatch={dispatch} todo={todo} type={element.task} onDrop={onDrop} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} />)
                            }
                            <div style={{ height: 10 }} title={element.task} onDrop={event => onDrop(event, element.task, {})} onDragStart={event => onDragStart(event, element.task, {})} onDragEnd={event => onDragEnd(event, element.task, {})} onDragOver={event => onDragOver(event, element.task, {})} draggable />
                        </div>
                        {
                            element.task == "do" && <input
                                ref={inputRef}
                                className="todo__input"
                                placeholder="What need to be done?"
                                onKeyDown={e => onCreateTodo(e)}
                            />
                        }
                    </div>
                )
            }
        </div>
    );
};

export default ToDoPage;