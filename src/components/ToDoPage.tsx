import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from '../store/reducer';
import {
    createTodo,
    updateTodo
} from '../store/actions';
import Service from '../service';

import { Todo } from '../models/todo';

import AddNewTaskFrom from './AddNewTaskForm';
import ShowTodosList from './ShowTodosList';

import ModalEdit from './ModalEdit';

type EnhanceTodo = Todo | undefined;  // enhance type Todo

const ToDoPage = ({ history }: RouteComponentProps) => {
    // Open/close modal for editing task
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    // declare editing task and setEditingTask
    const [editingTask, setEditingTask] = useState<EnhanceTodo>(undefined);

    const [{ todos }, dispatch] = useReducer(reducer, initialState);
  
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
    // define function Update Todo
    const onUpdateTodo = (todoId: string, content: string) => {
        dispatch(updateTodo(todoId, content));
        closeModal();
    }

  

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