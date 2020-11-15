import React, {useState, useRef, useEffect} from 'react';
import {isTodoCompleted} from "../../utils";
import {updateTodo} from "../../store/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const ToDoItem = ({ todo, dispatch, onUpdateTodoStatus, onDeleteTodo, ...props }: any) => {
    const [updateContent, setUpdateContent] = useState("")
    const [updating, setUpdating] = useState(false);
    const contentRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.addEventListener("click", onClickOutside);

        return () => {
            document.removeEventListener("click", onClickOutside);
        };
    },[]);

    const onClickOutside = (e: any) => {
        const { target } = e;
        if (contentRef.current && !contentRef.current.contains(target)) {
            setUpdating(false);
        }
    }

    const onUpdateTodoContent = () => {
        setUpdating(true);
        setUpdateContent(todo.content);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateContent(e.target.value);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && contentRef.current && contentRef.current.value !== '') {
            dispatch(updateTodo({ ...todo, content: contentRef.current.value }))
            setUpdateContent(contentRef.current.value);
            setUpdating(false);
        }
    }

    return (
        <div className={`todos-item ${todo.status === 'ACTIVE' ? 'active' : 'completed'}`}>
            <label className="todos-item_select">
            <input
                className="todos-checkbox"
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <span className="checkmark"></span>
            </label>
            {!updating ? <span className="todos-checkbox_label" onDoubleClick={onUpdateTodoContent}>{todo.content}</span> :
                <input className="todos-custom" value={updateContent} ref={contentRef}
                       onBlur={onClickOutside} onChange={onChange} onKeyDown={onKeyDown}
                />}
            <button
                className="btn-delete"
                onClick={() => onDeleteTodo(todo.id)}
            >
                <FontAwesomeIcon className="icon" icon={faTimes}/>
            </button>
        </div>
    );
};

export default ToDoItem;
