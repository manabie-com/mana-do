import React, { useContext } from "react";
import { deleteTodo, updateTodoContent, updateTodoStatus } from "../store/actions";
import { TodoContext } from "../store/context";
import { EditableContent } from "./EditableContent";

export function TodoList() {
    const { state, dispatch } = useContext(TodoContext);

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onUpdateTodoContent = (content: string, todoId: string) => {
        dispatch(updateTodoContent(todoId, content))
    }

    const onDeleteTodo = (todoId: string) => { 
        dispatch(deleteTodo(todoId));
    }

    return (
        <div className="ToDo__list">
            {
                state?.todos.length ?
                state.todos.map(({ content, id, status }) => {
                    return (
                        // use id instead of index
                        // ref: https://reactjs.org/docs/lists-and-keys.html
                        <div key={id} className="ToDo__item">
                            <input
                                type="checkbox"
                                // checked or unchecked based on status (equal COMPLETE) not filter state
                                checked={status === "COMPLETED"}
                                onChange={(event) => onUpdateTodoStatus(event, id)}
                            />
                            <EditableContent content={content} onChange={(content) => onUpdateTodoContent(content, id)} />
                            <button className="Todo__delete" onClick={() => onDeleteTodo(id)}>X</button>
                        </div>
                    );
                }) :
                <span>Enjoy your day!</span>
            }
        </div>
    );
}