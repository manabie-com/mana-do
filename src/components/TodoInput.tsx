import React, { useRef } from 'react'

interface Props{
    onCreateTodo: any;
    inputRef: any
}

const TodoInput: React.FC<Props> = ({onCreateTodo, inputRef}) => {
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

export default TodoInput;