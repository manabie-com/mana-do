import React, { useEffect, useReducer, useState } from 'react';
import { Todo } from '../../models/todo';
import reducer, { initialState } from '../../store/reducer';
import {
    setTodos,
    deleteTodo,
    updateTodoStatus,
    toggleAllTodos,
    deleteAllTodos,
    updateTodo
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import Task from '../Task';
import Actions from '../ActionButtons/Actions';
import ModalEdit from '../ModalEdit/ModalEdit';

type EnhanceTodoStatus = TodoStatus | 'ALL';
type EnhanceTodo = Todo | undefined;  // enhance type Todo

const ShowTodosList = (props: any) => {
    // declare editing task and setEditingTask
    const [editingTask, setEditingTask] = useState<EnhanceTodo>(undefined);
    // Open/close modal for editing task
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

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

    // Modal
    const openModal = (todo: Todo) => {
        setIsOpen(true);
        setEditingTask(todo);
    }

    const closeModal = () => {
        setIsOpen(false);
    }


    // define function Update Todo
    const onUpdateTodo = (todoId: string, content: string) => {
        dispatch(updateTodo(todoId, content));
        closeModal();
    }
    
    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId))
    }

    // Action buttons

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    const toggleShowing = (status: EnhanceTodoStatus) => {
        setShowing(status);
    }

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp));
        })()
    }, [])

    return (
        <div>
            <div className="ToDo__list">
                {showTodos ?
                    showTodos.map((todo: Todo, index: number) => {
                        return (
                            <Task
                                index={index}
                                todo={todo}
                                onUpdateTodoStatus={onUpdateTodoStatus}
                                onDeleteTodo={onDeleteTodo}
                                openModal={openModal}
                            />
                        );
                    })
                    : "No item"}
            </div>

            <Actions
                todos={todos}
                activeTodos={activeTodos}
                onToggleAllTodo={onToggleAllTodo}
                toggleShowing={toggleShowing}
                TodoStatus={TodoStatus}
                onDeleteAllTodo={onDeleteAllTodo}
            />

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