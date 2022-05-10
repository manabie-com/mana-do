// Library
import React, {useState} from 'react';

// Molecules
import {ButtonIcon} from "../ButtonIcon";
import {Design, InputAddTask} from "../InputAddTask";

// Type
import {Todo, TodoStatus} from "../../../models/todo";

// constant
import {TYPE_CALLBACK} from "../../../Modules/Home/ToDoList/slice/constants";

interface ItemListTodoProps {
    index?: any,
    callback: (type: string, value: any) => void
    todo: Todo,
}

export const ItemListTodo: React.FC<ItemListTodoProps> = (props) => {
    const {callback, todo, index} = props;

    const [isEdit, setIsEdit] = useState(false);

    const handleUpdateStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        callback(TYPE_CALLBACK.UPDATE_STATUS_BY_ID, {checked: e.target.checked, todoId})
    }

    const handleDeleteItemTodo = (todoId: string) => {
        callback(TYPE_CALLBACK.DELETE_ITEM_BY_ID, todoId)
    }

    const handleUpdateIsImportant = (todoId: string, isImportant: boolean) => {
        callback(TYPE_CALLBACK.UPDATE_IS_IMPORTANT, {todoId, isImportant})
    }

    const callbackEditItemTodo = (type:string, value: any) => {
        if (value && value.e.key === 'Enter' ) {
            callback(type,  value)
            toggleEdit()
        }
    }

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }

    return  (
        <div key={index} className="ToDo__item">
            <input
                type="checkbox"
                onChange={(e) => handleUpdateStatus(e, todo.id)}
                checked={todo.status === TodoStatus.COMPLETED}
                aria-label="check-todo"
            />
            {isEdit ?
                <InputAddTask callback={callbackEditItemTodo} typeCallback={TYPE_CALLBACK.UPDATE_TODO} todoId={todo.id} value={todo.content} design={Design.UPDATE}/> :
                <span onClick={toggleEdit}>{todo.content}</span>
            }
            <div className="Wrapper__GroupActionTodo">
                <ButtonIcon onClick={() => handleUpdateIsImportant(todo.id, !todo.is_important)} iconName={todo.is_important ? 'star' :'star_empty'}/>
                <ButtonIcon onClick={() => handleDeleteItemTodo(todo.id)} iconName="remove_tag"/>
            </div>
        </div>
    )
}
