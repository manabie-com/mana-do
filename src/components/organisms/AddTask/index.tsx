// Library
import React from 'react';

// Molecules
import {InputAddTask} from "../../molecules";

// Atoms
import {Checkbox} from "../../atoms";

// Constants
import {TYPE_CALLBACK} from "../../../Modules/Home/ToDoList/slice/constants";

interface AddTaskProps {
    callback: (type:string,value:any) => void
    typeCallback: string
    isShowCheckAll: boolean
}

export const AddTask:React.FC<AddTaskProps> = (props) => {
    const {callback, typeCallback, isShowCheckAll} = props;

    const onCheckToggleAll = (e: React.ChangeEvent<HTMLInputElement> ) => {
        callback(TYPE_CALLBACK.TOGGLE_ALL_TODO, e.target.checked)
    }

    return (
        <div className="AddTask">
            {isShowCheckAll && <Checkbox onChange={onCheckToggleAll}></Checkbox>}
            <InputAddTask callback={callback} typeCallback={typeCallback} placeholder="+ Add a task"/>
        </div>
    )
}