import React, { useRef } from 'react';
import './ToDoInput.css'

export interface ToDoInputProps {
    onCreateTodo(content: string): Promise<void>
}

function ToDoInput({onCreateTodo}: ToDoInputProps) {
    const inputRef = useRef<any>(null);

    const onHandleCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Make sure that todo input is not empty or all white space
        if (e.key === 'Enter' && inputRef.current.value.trim()) {
            onCreateTodo(inputRef.current.value.trim());
            inputRef.current.value = '';
        }
    }

    return (
        <div className="Todo__creation">
            <input
                data-testid="todo-input"
                ref={inputRef}
                className="Todo__input"
                placeholder="What need to be done?"
                onKeyDown={onHandleCreateTodo}
            />
        </div>
    )
}

export default ToDoInput