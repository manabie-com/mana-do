import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from '../../store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import ToolBar from '../common/tool-bar/ToolBar';
import TaskCreateInput from '../common/to-do-create-input/ToDoCreateInput';
import ToDoList from '../common/to-do-list/ToDoList';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId));
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }
    const toolBarProps = {
        todos,
        onToggleAllTodo,
        setShowing,
        onDeleteAllTodo
    }
    const taskCreateInputProps = {
        inputRef,
        onCreateTodo,
    }
    const toDoListProps = {
        todos,
        onUpdateTodoStatus,
        onDeleteTodo,
        showing
    }
    return (
        <div className="to-do__container">
            <div className="to-do__creation">
                <TaskCreateInput {...taskCreateInputProps} />
            </div>
            <div className="to-do__toolbar">
                <ToolBar {...toolBarProps} />
            </div>
            <div className="to-do__list">
                <ToDoList {...toDoListProps} />
            </div>
        </div>
    );
};

export default ToDoPage;