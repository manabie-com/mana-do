import React, { useState } from "react";

export interface ToDoCreateProps {
    onCreateTodo: any;
}

const ToDoCreate: React.FC<ToDoCreateProps> = ({ onCreateTodo }) => {
    const [todo, setTodo] = useState<any>("");

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (todo === "") return;
            onCreateTodo(todo);
            setTodo("");
        }
    };

    return (
        <div className="Todo__creation">
            <input
                className="Todo__input"
                value={todo}
                placeholder="What needs to be done?"
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={onKeyDown}
                autoFocus
            />
        </div>
    );
};

export default ToDoCreate;
