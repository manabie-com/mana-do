import './index.scss';
import React from 'react';

export default function TodoCreation(props: any) {
    const {inputRef, onCreateTodo} = props;
    return (
        < div className="Todo__creation" >
            <input
                ref={inputRef}
                className="Todo__input"
                placeholder="What need to be done?"
                onKeyDown={onCreateTodo}
            />
        </div >)
}