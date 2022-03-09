import React, { useContext } from "react"
import Service from "../service";
import { createTodo } from "../store/actions";
import { TodoContext } from "../store/context";

export function TodoInput() {
    const { dispatch } = useContext(TodoContext);
    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // async await should be used with try catch to handle error
            try {
                // using event instead of ref
                const resp = await Service.createTodo(e.currentTarget.value);
                dispatch(createTodo(resp));
                // enhancement: reset input
                // e.currentTarget.value = '';
            } catch (error) {
                // should notify user
                console.error(error);
            }
        }
    }

    return (
        <div className="Todo__creation">
            <input
                className="Todo__input"
                placeholder="What need to be done?"
                onKeyDown={onCreateTodo}
            />
        </div>
    );
}