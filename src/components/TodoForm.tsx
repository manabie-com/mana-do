import React, { useEffect, useRef, useState } from 'react'

const TodoForm = ({ edit, onCreateTodo, onUpdateTodo }: { edit?: any, onCreateTodo?: any, onUpdateTodo?: any }) => {
    const [input, setInput] = useState(edit ? edit.value : '');
    const inputRef = useRef<HTMLInputElement>(null);

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onCreateTodo(e)
    }

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }
    useEffect(() => {
        inputRef.current?.focus();
    });


    return (
        <div className="Todo__creation">
            {
                edit ?
                    <input
                        ref={inputRef}
                        value={input}
                        className="Todo__input"
                        placeholder="What need to be updated?"
                        // onClick={() => onUpdateTodo(edit.id, edit.content)}
                        onChange={inputChangeHandler}
                    />
                    :
                    <input
                        ref={inputRef}
                        value={input}
                        className="Todo__input"
                        placeholder="What need to be done?"
                        onKeyDown={onKeyDownHandler}
                        onChange={inputChangeHandler}
                    />

            }

        </div>
    )
}

export default TodoForm
