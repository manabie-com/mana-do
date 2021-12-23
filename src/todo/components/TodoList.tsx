
import React, { FC, useContext} from 'react'
import { TodoStatus } from '../../models/todo';
import { TodoContext } from '../contexts/TodoContext'
import TodoItem from './TodoItem'



const TodoList:FC = () => {
    const {todoList, showingStatus} = useContext(TodoContext)
    const {todos} = todoList
   

    const showTodos = todos.filter((todo) => {
        switch (showingStatus) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    return (
        <div className="ToDo__list" data-testid="todo-list" aria-label="todo-list">
        {
            showTodos.map((todo, index) => {
                return (
                    <TodoItem  key={index}  todo={todo} />
                );
            })
        }
    </div>
    )
}

export default TodoList
