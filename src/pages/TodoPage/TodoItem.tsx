import React, { useState } from "react";
import { Todo } from "../../models/todo";
import MyButton from "../../shared/components/MyButton";
import MyInputField from "../../shared/components/MyInputField";
import { isTodoCompleted } from "../../utils";
interface IProps extends Todo {
    onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    onDeleteTodo: (id: string) => void;
    onUpdateTodo: (id: string, value: string) => void;
}

const TodoItem = (props: IProps) => {
    let { id, content, onUpdateTodoStatus, onDeleteTodo, onUpdateTodo } = props;
    const [value, setValue] = useState<string>(content);
    const [isEdit, setEdit] = useState<boolean>(false);

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateTodo();
        }
    }

    const updateTodo = () => {
        if (value) {
            onUpdateTodo(id, value);
            setEdit(false);
        }
    }

    return (
        <div className="todo-item" >
            <div className="value-container">
                <MyInputField
                    type="checkbox"
                    checked={isTodoCompleted(props)}
                    onChange={(e) => onUpdateTodoStatus(e, id)}
                />
                <div className="value-content" onDoubleClick={() => setEdit(!isEdit)}>
                    {
                        isEdit ?
                            <MyInputField
                                autoFocus
                                onChange={onChangeValue}
                                onBlur={updateTodo}
                                onKeyDown={onPressEnter}
                                value={value}
                            /> :
                            <span>{content}</span>
                    }
                </div>
            </div>
            <MyButton
                label="X"
                className="delete-todo"
                onClick={() => onDeleteTodo(id)}
            />
        </div>
    )
}

export default TodoItem;