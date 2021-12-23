import React from 'react';


import TodoList from './todo/components/TodoList';
import { TodoAdd } from './todo/components/TodoAdd';
import { TodoToolbar } from './todo/components/TodoToolbar';




const ToDoPage = () => {
    return (
        <div className="ToDo__container">
            <TodoAdd />
            <TodoList />
            <TodoToolbar />
        </div>
    );
};

export default ToDoPage;