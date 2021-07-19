import React, { RefObject, useRef } from 'react';

interface PropsTodo {
    className?: string;
    inputRef?: RefObject<HTMLInputElement>;
    onCreateTodo?: (value: string) => Promise<void>;
}

const ToDoCreate = ({
    className = '',
    onCreateTodo: handleCreateTodo = async () => { },
    ...props
}: PropsTodo) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current && inputRef.current.value) {
            handleCreateTodo(inputRef.current.value);
            inputRef.current.value = '';
        }
    }
    return (
        <div className={className || ''}>
            <input
                ref={inputRef}
                className="Todo__input"
                placeholder="What need to be done?"
                onKeyDown={onCreateTodo || (() => {})}
            />
        </div>
    );
};

export default ToDoCreate;