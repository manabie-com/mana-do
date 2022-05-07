import React from 'react';
import './ToDoInput.css'

export interface ToDoInputProps {
    inputRef: React.MutableRefObject<HTMLInputElement>,
    onCreateTodo(e: React.KeyboardEvent<HTMLInputElement>): Promise<void>
}

function ToDoInput({inputRef, onCreateTodo}: ToDoInputProps) {
    return (
        <div className="Todo__creation">
            <input
                ref={inputRef}
                className="Todo__input"
                placeholder="What need to be done?"
                onKeyDown={onCreateTodo}
            />
        </div>
    )
}

export default ToDoInput