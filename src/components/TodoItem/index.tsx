import React from 'react';
import './index.css';

import { Todo, TodoStatus } from 'models/todo';

export interface TodoItemProps {
    index: number;
    todo: Todo;
    onUpdateTodoStatus(e: any, id: string): void;
    onUpdateTodo(e: any, id: string): void;
    onEditingTodo(e: any, id: string): void;
    onEditTodo(e: any, id: string): void;
    onDeleteTodo(id: string): void; 
}

export const TodoItem = (props: TodoItemProps) => {
    return (
        <div
            key={props.index}
            className={
                "ToDo__item " +
                (props.todo.status === TodoStatus.ACTIVE
                    ? "todo-color-active"
                    : "todo-color-complete")
            }
        >
            <input
                type="checkbox"
                className="todo-checkbox"
                checked={props.todo.status === TodoStatus.COMPLETED}
                onChange={(e) => props.onUpdateTodoStatus(e, props.todo.id)}
            />
            <input
                className="w-100 color-white"
                type="text"
                onBlur={(e) => props.onUpdateTodo(e, props.todo.id)}
                onChange={(e) => props.onEditingTodo (e, props.todo.id)}
                readOnly
                onDoubleClick={(e) => props.onEditTodo(e, props.todo.id)}
                value={props.todo.content}
            />
            <button
                className="Todo__delete"
                onClick={(e) => props.onDeleteTodo(props.todo.id)}
            >
                ✖
            </button>
        </div>
    );
};

