import React, { useEffect, useReducer, useState } from 'react';
import { Todo } from '../../models/todo';
import reducer, { initialState } from '../../store/reducer';
import {
    setTodos,
    updateTodo
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';

import Task from '../Task';
import ModalEdit from '../ModalEdit/ModalEdit';

type EnhanceTodo = Todo | undefined;  // enhance type Todo
type EnhanceTodoList = Array<Todo> | [];

const ShowTodosList = (props: any) => {

    const newTodo = props.newTodo; // get new todo from ToDoPage component to rerender ShowTodosList component

    const taskList = props.taskList; // get updated list of task to rerender this component

    const updateTaskList = props.updateTodoList; // pass updated data to ToDoPage when user update todo status 

    // get deleted todo from Task component to rerender ShowTodosList component
    const [deletedTodo, setDeletedTodo] = useState<EnhanceTodo>(undefined);

    // get todo list after updating check box
    const [todoList, setToDoList] = useState<EnhanceTodoList>([]);

    // declare editing task and setEditingTask to pass current data to ModalEdit
    const [editingTask, setEditingTask] = useState<EnhanceTodo>(undefined);

    // Open/close modal for editing task
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const [{ todos }, dispatch] = useReducer(reducer, initialState);

    const showing = props.showing;

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


     // define function Update Todo
    const onUpdateTodo = async (todoId: string, content: string) => {
        dispatch(updateTodo(todoId, content)); // update State todo
        closeModal();
    }

    // Get deleted todo to rerender this component
    const getDeletedTodo = (todo:Todo) => {
        setDeletedTodo(todo);
    }

    // Get todos list after editing todo status to rerender this component
    const updateTodoList = (todoList:Array<Todo>) => {
        setToDoList(todoList);
        updateTaskList(todoList); // pass updated data to toDoPage to rerender Action component
    }

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp));
        })()
    }, [newTodo, deletedTodo, todoList, showing, taskList])

    return (
        <div>
            <div className="ToDo__list">
                {showTodos ?
                    showTodos.map((todo: Todo, index: number) => {
                        return (
                            <Task
                                index={index}
                                todo={todo}
                                openModal={openModal}
                                getDeletedTodo={getDeletedTodo} // pass data from Task component to ShowTodosList component
                                updateTodoList={updateTodoList} // pass data from Task component to ShowTodosList component
                            />
                        );
                    })
                    : "No item"}
            </div>

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