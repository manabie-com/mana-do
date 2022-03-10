import React, { useContext } from "react";
import { updateTodoContent, updateTodoStatus } from "../store/actions";
import { TodoContext } from "../store/context";
import { EditableContent } from "./EditableContent";

export function TodoList() {
    const { state, dispatch } = useContext(TodoContext);

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onUpdateTodoContent = (content: string, todoId: any) => {
        dispatch(updateTodoContent(todoId, content))
    }

    return (
        <div className="ToDo__list">
            {
                state?.todos.length ?
                state.todos.map(({ content, id, status }) => {
                    return (
                        // use id instead of index
                        <div key={id} className="ToDo__item">
                            <input
                                type="checkbox"
                                // checked or unchecked based on status not filter
                                checked={status === "COMPLETED"}
                                onChange={(event) => onUpdateTodoStatus(event, id)}
                            />
                            <EditableContent content={content} onChange={(content) => onUpdateTodoContent(content, id)} />
                            <button className="Todo__delete">X</button>
                        </div>
                    );
                }) :
                <span>Enjoy your day!</span>
            }
        </div>
    );
}