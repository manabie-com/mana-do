import React from 'react';
import './index.css';

export interface TodoInputProps {
    inputRef: any;
    _onCreateTodo(content: string): void;
}

export const TodoInput = (props: TodoInputProps) => {
    const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // fire handler when user hit Enter
        if (e.key === "Enter") {
            // todo shouldn't empty
            if (props.inputRef.current.value !== "") {
                props._onCreateTodo(props.inputRef.current.value)
            }
        }
    };

    return (
        <div className="Todo__creation bg-primary rounded p-5">
            <div className="w-100 text-align-left">
                <div className="font-size-large font-weight-bold color-white">
                    What need to be done?
                </div>
                <div className="color-white my-3">Type here then enter!</div>
                <div className="w-100 input-todo">
                    <input
                        data-testid='todo-input'
                        ref={props.inputRef}
                        className="Todo__input"
                        onKeyDown={onCreateTodo}
                    />
                </div>
            </div>
        </div>
    );
};

