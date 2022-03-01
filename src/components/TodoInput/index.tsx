import React from 'react';
import './index.css';

export interface TodoInputProps {
    inputRef: any;
    onCreateTodo(e: any): void;
}

export const ToDoInput = (props: TodoInputProps) => {
    return (
        <div className="Todo__creation bg-primary rounded p-5">
            <div className="w-100 text-align-left">
                <div className="font-size-large font-weight-bold color-white">
                    What need to be done?
                </div>
                <div className="color-white my-3">Type here then enter!</div>
                <div className="w-100 input-todo">
                    <input
                        ref={props.inputRef}
                        className="Todo__input"
                        onKeyDown={props.onCreateTodo}
                    />
                </div>
            </div>
        </div>
    );
};

