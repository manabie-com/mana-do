import React, { useReducer } from 'react';
import { isTodoCompleted } from '../utils';
import reducer, { initialState } from '../store/reducer';
import {
    updateTodoStatus, deleteTodo
} from '../store/actions';
import Service from '../service';
import { Todo } from '../models/todo';

const Task = (props: any) => {
    const openModal = props.openModal;
    const index = props.index;
    const todo = props.todo;
    const getDeletedTodo = props.getDeletedTodo;
    const updateTodoList = props.updateTodoList;
    const [{ todos }, dispatch] = useReducer(reducer, initialState);


    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
        console.log(todo);
        dispatch(updateTodoStatus(todo, e.target.checked));
        const resp = await Service.getTodos();
        updateTodoList(resp); // pass data to ShowTodosList component to rerender it
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId));
        getDeletedTodo(todo); // pass data to ShowTodosList component to rerender it
    }
    return (
        <div key={index} className="ToDo__item" >
            <div className="item-checkbox">
                <input
                    type="checkbox"
                    checked={isTodoCompleted(todo)}
                    onChange={(e) => onUpdateTodoStatus(e, todo)}
                />
            </div>

            <span className="item-content" onDoubleClick={() => openModal(todo)}>{todo.content}</span>
                <button
                    className="Todo__delete"
                    onClick={() => onDeleteTodo(todo.id)}
                >
                    <svg height="20pt" viewBox="-64 0 512 512" width="20pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 80h-32v-48h-64v48h-32v-80h128zm0 0" fill="#62808c"/><path d="m304 512h-224c-26.507812 0-48-21.492188-48-48v-336h320v336c0 26.507812-21.492188 48-48 48zm0 0" fill="#e76e54"/><path d="m384 160h-384v-64c0-17.671875 14.328125-32 32-32h320c17.671875 0 32 14.328125 32 32zm0 0" fill="#77959e"/><path d="m260 260c-6.246094-6.246094-16.375-6.246094-22.625 0l-41.375 41.375-41.375-41.375c-6.25-6.246094-16.378906-6.246094-22.625 0s-6.246094 16.375 0 22.625l41.375 41.375-41.375 41.375c-6.246094 6.25-6.246094 16.378906 0 22.625s16.375 6.246094 22.625 0l41.375-41.375 41.375 41.375c6.25 6.246094 16.378906 6.246094 22.625 0s6.246094-16.375 0-22.625l-41.375-41.375 41.375-41.375c6.246094-6.25 6.246094-16.378906 0-22.625zm0 0" fill="#fff"/></svg>
                </button>

        </div >
    )
}

export default Task;