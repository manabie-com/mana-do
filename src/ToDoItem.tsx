import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo
} from './store/actions';
import {TodoStatus} from './models/todo';
import { AppActions } from './store/actions';
import {Todo} from "./models/todo"

interface ToDoItemProps{
  todo:Todo;
  dispatch: React.Dispatch<AppActions>
}

const ToDoItem:React.FC<ToDoItemProps> = ({todo,dispatch}) => {
    const isCompleted =()=> todo.status === 'COMPLETED'

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onDeleteTodo = (todoId:string) => {
        dispatch(deleteTodo(todoId));
    }

  return (
    <div className={`ToDo__item ${isCompleted() && "ToDo__item_completed"}`}>
    <input
        type="checkbox"
        checked={isCompleted()}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
    />
    <div className="column w-full top">
        <span className={`Todo_text_content ${isCompleted() && "text_completed"}`}>{todo.content}</span>
        <div className="row">
        <span className="Todo_data_created">{new Date(todo.created_date).toLocaleDateString('en-GB')}</span>
        <span>{todo.user_id}</span>
        </div>
    </div>
    <button
        className="Todo__delete"
        onClick={()=> onDeleteTodo(todo.id)}
    >
        delete
    </button>
</div>
  );
};

export default ToDoItem;