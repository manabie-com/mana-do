import React, { useEffect, useReducer, useState } from 'react';

import { Todo } from '../models/todo';

import reducer, { initialState } from '../store/reducer';
import {
    setTodos,
    toggleAllTodos,
    deleteAllTodos,
} from '../store/actions';
import Service from '../service';
import { TodoStatus } from '../models/todo';

import AddNewTaskForm from './AddNewTaskForm';
import ShowTodosList from './ShowTodosList';
import ActionButtons from './ActionButtons';
import Header from './Header';

type EnhanceTodoStatus = TodoStatus | 'ALL';
type EnhanceTodo = Todo | undefined;  // enhance type Todo
type EnhanceTodoList = Array<Todo> | [];

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

    // to get data from AddNewtaskFrom to rerender this component
    const [newTodo, setNewTodo] = useState<EnhanceTodo>(undefined);

    // for passing data from ShowTodosList to update UI in ActionButtons
    const [tasksList, setTaskList] = useState<EnhanceTodoList>([]);


    // for receiving new todo from AddNewTakForm 
    const getNewTodo = (newTodo: Todo) => {
        setNewTodo(newTodo)
    }

    // to update todos list in ShowTodosList
    const toggleShowing = (status: EnhanceTodoStatus) => {
        setShowing(status);
    }

    // to update TaskList
    const editTodo = async () => {
        const resp = await Service.getTodos();
        setTaskList(resp);
    }

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            setTaskList(resp);
            dispatch(setTodos(resp || []));
        })()
    }, [newTodo])

    const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked));
        await Service.toggleAllTodo(e.target.checked)
        const resp = await Service.getTodos();
        setTaskList(resp);
    }

    const onDeleteAllTodo = async () => {
        dispatch(deleteAllTodos());
        await Service.deleteAllTodo();
        setTaskList([]);
    }


    return (
        <div className="body-part">
            <div className="ToDo__container">
                <Header />

                <AddNewTaskForm getNewTodo={getNewTodo} />

                <ShowTodosList showing={showing} tasksList={tasksList} editTodo={editTodo} />

                <ActionButtons toggleShowing={toggleShowing}
                    onDeleteAllTodo={onDeleteAllTodo}
                    onToggleAllTodo={onToggleAllTodo}
                    tasksList={tasksList} />
            </div>
        </div>

    );
};

export default ToDoPage;