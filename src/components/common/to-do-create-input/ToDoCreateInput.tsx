import { FC, useRef } from "react";
import { createTodo } from "../../../store/actions";
import Service from '../../../service';
import { Todo } from "../../../models/todo";
import { toast } from "react-toastify";

interface ToDoCreateInputProps {
    dispatch: Function;
}

const ToDoCreateInput: FC<ToDoCreateInputProps> = ({ dispatch }) => {
    const inputRef = useRef<any>(null);

    const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            Service.createTodo(inputRef.current.value)
                .then(res => {
                    toast.success(`add task successfuly!`)
                    const { id, status, content, createdAt, userId } = res.data;
                    const newTodo: Todo = {
                        id,
                        status,
                        content,
                        created_date: createdAt,
                        user_id: userId
                    }
                    dispatch(createTodo(newTodo));
                })
                .catch(err => {
                    toast.error(`Can't add more than 5 task per day!`)
                });
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