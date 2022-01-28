import { FC, useRef } from "react";
import { createTodo } from "../../../store/actions";
import Service from '../../../service';
import { Todo } from "../../../models/todo";

interface ToDoCreateInputProps {
    dispatch: Function;
}

const ToDoCreateInput: FC<ToDoCreateInputProps> = ({ dispatch }) => {
    const inputRef = useRef<any>(null);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const res = await Service.createTodo(inputRef.current.value);
            const { id, status, content, createdAt, userId } = res.data;
            const newTodo: Todo = {
                id,
                status,
                content,
                created_date: createdAt,
                user_id: userId
            }
            dispatch(createTodo(newTodo));
        }
    }
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