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
    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onDeleteTodo = (todoId:string) => {
        dispatch(deleteTodo(todoId));
    }

  return (
    <div className="ToDo__item">
    <input
        type="checkbox"
        checked={todo.status === 'COMPLETED'}
        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
    />
    <span>{todo.content}</span>
    <button
        className="Todo__delete"
        onClick={()=> onDeleteTodo(todo.id)}
    >
        x
    </button>
</div>
  );
};

export default ToDoItem;