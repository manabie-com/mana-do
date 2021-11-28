import React from 'react';
import {isTodoCompleted} from '../utils';


const ToDoItem = (props: any) => {
    return <>
        <div className="ToDo__item">
            <input
                type="checkbox"
                checked={isTodoCompleted(props.todo)}
                onChange={(e) =>
                    props.onUpdateTodoStatus(e, props.todo.id)}
            />
            <span>{props.todo.content}</span>
            <button
                className="Todo__delete"
                onClick={() => {
                    props.onDeleteTodo(props.todo.id)
                }}
            >
                X
            </button>
        </div>
    </>;
};

export default ToDoItem;