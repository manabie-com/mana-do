import  React, {useRef, useEffect, useState, Dispatch} from 'react';
import {
    deleteTodo,
    updateTodoStatus,
    closeAllEditForm,
    showEditFormTodo,
    updateTodoContent,
    AppActions,
} from '../../store/actions';
import {Todo} from '../../models/todo';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Service from '../../service';

interface ListComponentProps {
    todos: Todo[],
    dispatch: Dispatch<AppActions>
    showing: string,
}

const TodoList = ({todos, showing, dispatch}: ListComponentProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [editContentTodo, setEditContentTodo] = useState('');    
    
    const onUpdateTodoStatus = async(e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        try {
            const newTodo = await Service.updateTodoStatus(todoId, e.target.checked);
            dispatch(updateTodoStatus(newTodo))   
        } catch (error) {
            console.error(error);
        }
    }

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            dispatch(closeAllEditForm());
        }
    };

    const handleClickOutside = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            dispatch(closeAllEditForm());
        } 
    };
    
    const deleteSelectTodo = async(e: React.MouseEvent<HTMLButtonElement>, todoId: any) => {
        try {
            await Service.deleteTodo(todoId);
            dispatch(deleteTodo(todoId));    
        } catch (error) {
            console.error(`Can't delete todo with id ${todoId}`)
        }
    }

    const showEdit = (e: React.MouseEvent<HTMLDivElement>, todo: any) => {
        if(e.detail === 2) {
            setEditContentTodo(todo.content);
            dispatch(showEditFormTodo(todo.id));
        }
    }

    const changeValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditContentTodo(e.target.value);
    }

    const updateTodo = async (e: React.KeyboardEvent<HTMLInputElement>, todo: any) => {
        if (e.key === 'Enter' ) { 
            try {
                const todoRes = await Service.updateTodoContent(todo.id, editContentTodo);
                dispatch(updateTodoContent(todoRes));
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(()=>{
        document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="ToDo__list" ref={ref}>
            {
                todos.map((todo, index) => {
                    return (
                        (showing === todo.status || showing === 'ALL') && (
                            <div key={index} className="ToDo__item" onClick={(e) => showEdit(e, todo)}>
                                <input
                                    type="checkbox"
                                    //checked={showing === todo.status}
                                    checked={todo.status === 'COMPLETED' ? true : false}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                {
                                    todo.editContent && (<input type="text" value={editContentTodo} onKeyDown={(e) => {updateTodo(e, todo)}} onChange={(e) => changeValueInput(e)} className="Todo__input--edit"/>)
                                }
                                {
                                    !todo.editContent && (<span>{todo.content}</span>)
                                }
                                <button
                                    className="Todo__delete"
                                    onClick={(e) => deleteSelectTodo(e, todo.id)}
                                >
                                    <RiDeleteBin5Line height={'16px'} width={'16px'}/>
                                </button>
                            </div>
                        )
                    );
                })
            }
        </div>
    )
}

export default TodoList;