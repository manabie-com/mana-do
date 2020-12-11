import React, { useEffect, useReducer, useState } from 'react';
import { Todo } from '../models/todo';
import reducer, { initialState } from '../store/reducer';
import {
    setTodos,
    updateTodoStatus,
    deleteTodo,
    updateTodo
} from '../store/actions';
import Service from '../service';
import { TodoStatus } from '../models/todo';
import Task from './Task';
import ModalEdit from './ModalEdit';

type EnhanceTodo = Todo | undefined;  // enhance type Todo

const ShowTodosList = (props: any) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);

    const showing = props.showing;

    const tasksList = props.tasksList;

    const editTodo = props.editTodo;

     // declare editing task and setEditingTask to pass current data to ModalEdit
     const [editingTask, setEditingTask] = useState<EnhanceTodo>(undefined);

     // Open/close modal for editing task
     const [modalIsOpen, setIsOpen] = useState<boolean>(false);

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


    // Modal
    const openModal = (todo: Todo) => {
        setIsOpen(true);
        setEditingTask(todo);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
        const todoStatus = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        todo.status = todoStatus;
        dispatch(updateTodoStatus(todo.id, e.target.checked));
        await Service.updateTodo(todo);
        editTodo();
    }

    const deleteATodo = async (todo: Todo) => {
        dispatch(deleteTodo(todo.id))
        await Service.deleteTodo(todo.id)
        editTodo()
    }

     // define function Update Todo
     const onUpdateTodo = async (todoId: string, content: string) => {
        dispatch(updateTodo(todoId, content)); // update State todo
        const resp = await Service.getTodos();
        const currentIndex = resp.findIndex((task) => task.id === todoId);
        resp[currentIndex].content = content;
        await Service.updateTodo(resp[currentIndex]);
        closeModal();
    }

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [tasksList])

    return (
        <div className="ToDo__list">
            {
                showTodos.map((todo, index) => {
                    return (
                        <div key={index}>
                            <Task todo={todo}
                                deleteATodo={deleteATodo}
                                onUpdateTodoStatus={onUpdateTodoStatus} 
                                openModal={openModal}/>
                        </div>
                    );
                })
            }
            {/* Modal for editing task */}
            {editingTask ?
                <ModalEdit modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                    task={editingTask}
                    onUpdateTodo={onUpdateTodo}
                /> : ""}
        </div>
    )
}


export default ShowTodosList