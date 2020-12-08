import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from '../store/reducer';
import {
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodo
} from '../store/actions';
import Service from '../service';
import { TodoStatus } from '../models/todo';
import { isTodoCompleted } from '../utils';
import { Todo } from '../models/todo';

import AddNewTaskFrom from './AddNewTaskForm';
import ShowTodosList from './ShowTodosList';

import ModalEdit from './ModalEdit';

type EnhanceTodoStatus = TodoStatus | 'ALL';

type EnhanceTodo = Todo | undefined;  // enhance type Todo

const ToDoPage = ({ history }: RouteComponentProps) => {
    // Open/close modal for editing task
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    // declare editing task and setEditingTask
    const [editingTask, setEditingTask] = useState<EnhanceTodo>(undefined);

    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp)); // call dispatch 2 times ???
                inputRef.current.value = '';
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    const onUpdateTodo = (todoId: string, content: string) => {
        dispatch(updateTodo(todoId, content));
        closeModal();
    }
    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }


    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    // Modal
    const openModal = (todo: Todo) => {
        setIsOpen(true);
        setEditingTask(todo);
    }

    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <div className="ToDo__container">
            <AddNewTaskFrom inputRef={inputRef}
                onCreateTodo={onCreateTodo} />

            {/* Show list of tasks */}
            <ShowTodosList
                openModal={openModal}
            />


            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className="Action__btn" onClick={() => setShowing('ALL')}>
                        All
                    </button>
                    <button className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>

            {/* Modal for editing task */}
            {editingTask ?
                <ModalEdit modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                    task={editingTask}
                    onUpdateTodo={onUpdateTodo}
                /> : ""}

        </div>
    );
};

export default ToDoPage;