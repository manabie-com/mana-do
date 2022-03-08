import React, {Dispatch, useRef} from "react";
import {AppActions, createTodo} from "store/actions";
import Service from "service";

interface TodoCreationProps {
    dispatch: Dispatch<AppActions>,
}

const TodoCreation: React.FC<TodoCreationProps> = ({dispatch}) => {
    const createTodoRef = useRef<any>(null);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const node = createTodoRef?.current
        if (e.key === 'Enter' && node.value.length) {
            const resp = await Service.createTodo(node.value);
            dispatch(createTodo(resp));
            node.value = "";
        }
    }

    return <>
        <h1>todos</h1>
        <div className="Todo__creation">
            <input
                ref={createTodoRef}
                className="Todo__creation__input"
                placeholder="What need to be done?"
                onKeyDown={(e) => onCreateTodo(e)}
            />
        </div>
    </>;
};

export default TodoCreation;
