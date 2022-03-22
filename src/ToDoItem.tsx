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
import Service from './service';
import {TodoStatus} from './models/todo';
import {Todo} from "./models/todo"

interface ToDoItemProps{
  index:number;
  todo:Todo
}

const ToDoItem:React.FC<ToDoItemProps> = ({index,todo}) => {
  const [{todos}, dispatch] = useReducer(reducer, initialState);

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onDeleteTodo = (todoId:string) => {
        dispatch(deleteTodo(todoId));
    }

  return (
    <div key={index} className="ToDo__item">
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
        X
    </button>
</div>
  );
};

export default ToDoItem;