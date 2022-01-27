import { FC, LegacyRef } from "react";

interface ToDoCreateInputProps {
    inputRef: LegacyRef<HTMLInputElement>;
    onCreateTodo: Function;
}

const ToDoCreateInput: FC<ToDoCreateInputProps> = ({ inputRef, onCreateTodo }) => {

    return (
        <input
            ref={inputRef}
            className="to-do__input"
            placeholder="What need to be done?"
            onKeyDown={e => onCreateTodo(e)}
        />
    )
}

export default ToDoCreateInput;