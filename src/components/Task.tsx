import React from 'react';

const Task = (props: any) => {
    const openModal = props.openModal;
    const index = props.index;
    const todo = props.todo;
    const isTodoCompleted = props.isTodoCompleted;
    const onUpdateTodoStatus = props.onUpdateTodoStatus;
    const onDeleteTodo = props.onDeleteTodo;

    return (
        <div key={index} className="ToDo__item" onDoubleClick={() => openModal(todo)}>
            <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <span>{todo.content}</span>
            <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
            >
                X
                                </button>
        </div >
    )
}

export default Task;