// Library
import React, {useEffect, useRef} from 'react';

export enum Design {
    "CREATE" = "CREATE",
    "UPDATE" = "UPDATE"
}

interface InputAddTaskProps extends React.HTMLAttributes<any>{
    callback: (type:string, value:any) => void
    typeCallback: string;
    todoId?: string,
    value?: string,
    design?: Design,
    placeholder?: string,
}

export const InputAddTask: React.FC<InputAddTaskProps> = (props) => {
    const {callback, typeCallback,todoId,value='',design=Design.CREATE, placeholder} = props;

    const inputRef = useRef<any>('');

    useEffect(() => {
        if(inputRef && design === Design.UPDATE){
            inputRef.current.value = value
        }
    }, [value])


    const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            callback(typeCallback, {e, value: inputRef.current.value, todoId})
            inputRef.current.value = ''
        }

    }
    return (
        <input placeholder={placeholder}
               ref={inputRef}
               className="Todo__input"
               onKeyDown={onCreateTodo}
               autoFocus
               aria-label="todo-input"
               data-testid="todo-input"
        />
    )
}