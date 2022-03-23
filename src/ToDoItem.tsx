import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo,
    editTodo
} from './store/actions';
import {TodoStatus} from './models/todo';
import { AppActions } from './store/actions';
import {Todo} from "./models/todo"

interface ToDoItemProps{
  todo:Todo;
  dispatch: React.Dispatch<AppActions>
}

const ToDoItem:React.FC<ToDoItemProps> = ({todo,dispatch}) => {
    const [isEdit,setIsEdit] = useState<boolean>(false)

    const inputRef = useRef<any>(null);
    const itemTodo = useRef<any>(null)

    useEffect(() => {
        function handleClickOutside(event:any) {
          if (itemTodo.current && !itemTodo.current.contains(event.target)) {
            setIsEdit(false)
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [itemTodo]);

    const isCompleted =()=> todo.status === 'COMPLETED'

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onDeleteTodo = (todoId:string) => {
        dispatch(deleteTodo(todoId));
    }

    const onEditTodo = (todoId:string) => {
        setIsEdit(true);
    }

    const onUpdateTodoContent = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(editTodo(todo.id,inputRef.current.value))

            setIsEdit(false)
            inputRef.current.value = ''
        }
    }

  return (
    <div ref={itemTodo} className={`ToDo__item ${isCompleted() && "ToDo__item_completed"}`} onDoubleClick={() => onEditTodo(todo.id)}>
    <input
        type="checkbox"
        checked={isCompleted()}
        onChange={(e) => {
            onUpdateTodoStatus(e, todo.id)
        }}
    />
    <div className="column w-full top">
        {   isEdit ? 
            <input
                ref={inputRef}
                autoFocus 
                defaultValue = {todo.content}
                className='Update_todo w-90'
                type="text"
                onKeyDown={onUpdateTodoContent}
            /> : 
        <span className={`Todo_text_content ${isCompleted() && "text_completed"}`}>{todo.content}</span>
        }
        <div className="row">
        <span className="Todo_data_created">{new Date(todo.created_date).toLocaleDateString('en-GB')}</span>
        <span>{todo.user_id}</span>
        </div>
    </div>
    <button
        className="Todo__delete"
        onClick={()=> onDeleteTodo(todo.id)}
    >
        delete
    </button>
</div>
  );
};

export default ToDoItem;