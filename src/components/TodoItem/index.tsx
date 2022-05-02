import React from "react";
import { Todo } from "../../models/todo";
import Button from "../Button";
import Checkbox from "../Checkbox";

interface todoItem {
    index: number;
    todo: Todo;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    isShown: string
}

const TodoItem = (props: todoItem) => {
    const { index, todo, onChange, isShown } = props
    return (
        <div key={index} className="ToDo__item">
            <Checkbox checked={isShown === todo.status} onChange={onChange} index={index} />
            <span>{todo.content}</span>
            <Button title="X" className="Todo__delete" />
        </div>
    )
}

export default TodoItem