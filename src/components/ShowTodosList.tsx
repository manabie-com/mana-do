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
import Task from './Task';

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

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId))
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
                        <Task index={index} todo={todo}
                        isTodoCompleted={isTodoCompleted}
                        onUpdateTodoStatus={onUpdateTodoStatus}
                        onDeleteTodo={onDeleteTodo}
                        openModal={openModal}
                        />
                    );
                })
                : ""}
        </div>
    )
}

export default ShowTodosList