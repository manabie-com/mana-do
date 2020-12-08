import React, { useEffect, useReducer, useState } from 'react';
import { Todo } from '../models/todo';
import reducer, { initialState } from '../store/reducer';
import {
    setTodos,
    deleteTodo,
    updateTodoStatus
} from '../store/actions';
import Service from '../service';
import { TodoStatus } from '../models/todo';
import { isTodoCompleted } from '../utils';
type EnhanceTodoStatus = TodoStatus | 'ALL';

const ShowTodosList = (props: any) => {
    const openModal = props.openModal;
   
    const [{ todos }, dispatch] = useReducer(reducer, initialState);

    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

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

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp));
        })()
    }, [])

    return (
        <div className="ToDo__list">
            {showTodos ?
                showTodos.map((todo: Todo, index: number) => {
                    return (
                        <div key={index} className="ToDo__item" onDoubleClick={() => openModal(todo)}>
                            <input
                                type="checkbox"
                                checked={isTodoCompleted(todo)}
                                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                            />
                            <span>{todo.content}</span>
                            <button
                                className="Todo__delete"
                                onClick={() =>  dispatch(deleteTodo(todo.id))}
                            >
                                X
                                </button>
                        </div>
                    );
                })
                : ""}
        </div>
    )
}

export default ShowTodosList