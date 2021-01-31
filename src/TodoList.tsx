
import React, { useReducer, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TodoStatus } from './models/todo';
import { editTodoContent } from './store/actions';
import reducer, { initialState } from './store/reducer';
import { isTodoCompleted } from './utils';
type EnhanceTodoStatus = TodoStatus | 'ALL';
const TodoList = (props: any, { history }: RouteComponentProps) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [value, setValue] = useState("")

    useEffect(() => {
        setValue(props.data.content);
    }, [todos.length, props.data, props.data.status])
    // const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    //     dispatch(updateTodoStatus(todoId, e.target.checked))
    // }
    const onEditTodoContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            try {
                if (e.currentTarget.value !== '') {
                    dispatch(editTodoContent(e.currentTarget.id, value));
                    e.currentTarget.readOnly = true
                    props.data.content = value
                }

            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        }

    }
    return (
        <div className="ToDo__item">
            <div className="Todo__item_child">
                <input
                    type="checkbox"
                    checked={isTodoCompleted(props.data)}
                    onChange={(e) => props.onUpdateTodoStatus(e, props.data.id)}
                />

                <input
                    readOnly
                    onDoubleClick={(e) => {
                        e.currentTarget.readOnly = false;
                        e.currentTarget.selectionStart = e.currentTarget.selectionEnd

                    }}
                    onBlur={(e) => {
                        e.currentTarget.readOnly = true;
                        e.currentTarget.value = props.data.content
                    }}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    onKeyDown={onEditTodoContent}
                    type="text" value={value} id={props.data.id}
                />
            </div>
            <button
                className="Todo__delete"
                type="button"
                onClick={() => {
                    props.handleDelete(props.data.id)

                }}
            >
                X
        </button>
        </div>
    )
}
export default TodoList
