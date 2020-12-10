import React, { useState, useReducer, useEffect } from 'react';
import { Todo } from '../models/todo';
import AddNewTaskFrom from './AddNewTaskForm/AddNewTaskForm';
import ShowTodosList from './ShowTodosList/ShowTodosList';
import Header from './Header';
import {
    setTodos,
} from '../store/actions';

import reducer, { initialState } from '../store/reducer';
import Actions from './ActionButtons/Actions';
import Service from '../service';

type EnhanceTodo = Todo | undefined;  // enhance type Todo
type EnhanceTodoList = Array<Todo> | [];

const ToDoPage = () => {
    // for passing data from TodoPage to ShowListTodo
    const [newTodo, setNewTodo] = useState<EnhanceTodo>(undefined);

    // for passing data from Action Buttons to ShowListTodo
    const [showing, setShowing] = useState<string>("ALL");

    const [taskList, setTaskList] = useState<EnhanceTodoList>([]);

    const [{ todos }, dispatch] = useReducer(reducer, initialState);

    // for receiving new todo from AddNewTakForm 
    const getNewTodo = (todo: Todo) => {
        setNewTodo(todo)
    }

    const changeShowing = (status: string) => {
        setShowing(status);
    }

    const updateTodoList = (todoList: EnhanceTodoList) => {
        setTaskList(todoList);
    }

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp));
        })()
    }, [taskList])
    return (
        <div className="body-part">
            <div className="ToDo__container">
                <Header />

                <div className="bottom-part">
                    <AddNewTaskFrom getNewTodo={getNewTodo} />

                    {/* Show list of tasks */}
                    <ShowTodosList newTodo={newTodo}
                        showing={showing}
                        taskList={taskList}
                        updateTodoList={updateTodoList} />

                    <Actions
                        todos={todos}
                        changeShowing={changeShowing}
                        updateTodoList={updateTodoList}
                    />
                </div>

            </div>
        </div>

    );
};

export default ToDoPage;