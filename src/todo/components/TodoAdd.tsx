
import React, { FC, useContext, useRef } from 'react'
import { TodoContext } from '../contexts/TodoContext';

export const  TodoAdd:FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {onCreateTodo} = useContext(TodoContext)
    
    const createTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            onCreateTodo(inputRef.current.value)
            inputRef.current.value = '';
        }
    }
    return (
        <div className="Todo__creation">
            <input
                ref={inputRef}
                className="Todo__input"
                placeholder="What need to be done?"
                onKeyDown={createTodo}
            />
        </div>
    )
}
