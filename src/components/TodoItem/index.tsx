import React from "react";
import { Todo, TodoStatus } from "../../models/todo";
import Button from "../Button";
import Checkbox from "../Checkbox";

interface todoItem {
    todo: Todo;
    onCheck: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
    onDelete: (todoId: string) => void;
    setIsEdited: (todoId: string) => void;
    setEnteredTodo: (content: string) => void;
}

const TodoItem = (props: todoItem) => {
    const { todo, onCheck,  onDelete, setIsEdited, setEnteredTodo } = props || {}

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.detail === 1) {
            return
        } else if (event.detail === 2) {
            setIsEdited(todo?.id)
            setEnteredTodo(todo?.content)
        }
    }

    return (
        <div className="ToDo__item" onClick={handleClick}>
            <Checkbox checked={TodoStatus.COMPLETED === todo?.status} onChange={onCheck} todoId={todo?.id} />
            <span>{todo?.content}</span>
            <Button title="X" className="Todo__delete" onClick={() => onDelete(todo?.id)} />
        </div>
    )
}

export default TodoItem