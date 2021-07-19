import React, { useContext, useState } from "react";
import { Todo, TodoStatus } from "../../../models/todo";
import AppTag from "../../../commons/AppTag";
import AppText from "../../../commons/AppText";
import AppButton from "../../../commons/AppButton";
import AppInput from "../../../commons/AppInput";
import { AppContext } from "../../../store/context";
import { setTodos } from "../../../store/actions";
import { useHistory } from "react-router-dom";
import Service from "../../../service";
import AppCheckbox from "../../../commons/AppCheckbox";

interface ITodoItem {
    itemNo: number | string,
    todo: Todo,
}




const TodoItem = ({ todo, itemNo }: ITodoItem) => {
    const { dispatch } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState(todo);
    const history = useHistory();

    const onSave = async (todo: Todo) => {
        try {
            const response = await Service.updateTodo(todo);
            if (response.status === 200) {
                dispatch( setTodos(response.data) )
            }
            setIsEditing(false);
        } catch (error) {
            if (error.status === 401) {
                history.push('/');
            }
        }
    }

    const onRemove = async (todo: Todo) => {
        try {
            const response = await Service.deleteTodo(todo);
            if (response.status === 200) {
                dispatch( setTodos(response.data) )
            }
        } catch (error) {
            if (error.status === 401) {
                history.push('/');
            }
        }
    }
    const handleOnClickEdit = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIsEditing(true);
    }

    const handleOnClickCancel = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIsEditing(false);
    }

    const onChangeField = (e:React.ChangeEvent<HTMLInputElement>) => {
        let changedValue = e.target.value;
        setEditingItem({...todo, content: changedValue});
    }

    const handleOnClickSave = (e:React.MouseEvent<HTMLElement>) => {
        onSave(editingItem);
    }
    const handleOnClickRemove = (e:React.MouseEvent<HTMLElement>) => {
        onRemove(todo);
    }

    const onKeyboardEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSave(editingItem);
        }
    }

    const updateTodoStatus = async (todo:Todo,status: TodoStatus) => {
        try {
            const response = await Service.updateTodoStatus(todo, status);
            if (response.status === 200) {
                dispatch( setTodos(response.data) )
            }
        } catch (error) {
            if (error.status === 401) {
                history.push('/');
            }
        }
    }

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.checked;
        if (value) { 
            updateTodoStatus(todo, TodoStatus.COMPLETED) 
        } else {
            updateTodoStatus(todo, TodoStatus.ACTIVE)
        }
    }


    

    return (
        <tr>
            <td className="align-center">
                { itemNo}
            </td>
            <td className="align-center">
                <AppCheckbox defaultChecked={todo.status===TodoStatus.COMPLETED} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onCheckboxChange(e)}></AppCheckbox>
            </td>
            <td className="align-left">
                {!isEditing && <AppText strikethrough={todo.status===TodoStatus.COMPLETED}>{todo.content}</AppText>}
                {isEditing && <AppInput  className='edit-todo' onKeyDown={onKeyboardEnter} defaultValue={todo.content} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{onChangeField(e)}}></AppInput>}
            </td>
            <td className="align-center">
                <AppTag color={todo.status===TodoStatus.COMPLETED?"success":"warning"}>{todo.status}</AppTag>
            </td>
            <td className="align-center">
                {new Date(todo.created_date).toLocaleString('vi-VN')}
            </td>
            <td className="align-center">
                {!isEditing && <AppButton btnType="link" href="#" onClick={(e: React.MouseEvent<HTMLElement>)=>handleOnClickEdit(e)}>Edit</AppButton>}
                { isEditing && <AppButton btnType="link" href="#" onClick={(e: React.MouseEvent<HTMLElement>)=>handleOnClickSave(e)}>Save</AppButton>}
                { isEditing && <AppButton btnType="link" href="#" onClick={(e: React.MouseEvent<HTMLElement>)=>handleOnClickCancel(e)}>Cancel</AppButton>                 }
                <AppButton btnType="link" href="#" onClick={(e: React.MouseEvent<HTMLElement>)=>handleOnClickRemove(e)}>Remove</AppButton>
            </td>
        </tr>
    )
}

export default TodoItem;