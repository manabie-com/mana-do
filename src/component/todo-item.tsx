import React from 'react';

import {
    updateTodo,
    deleteTodo
} from '../store/actions';
import EditTodoModal from './edit-modal';
import { TodoStatus } from '../models/todo';
import Service from '../service';
import ButtonModal from './button-modal';

const TodoItem = ({ todo, dispatch }: any) => {

    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        const resp = await Service.updateTodo({ ...todo, status: e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE });

        dispatch(updateTodo(resp));
    }

    const onDeleteTodo = async () => {
        await Service.deleteTodo(todo.id);

        dispatch(deleteTodo(todo.id));
    }

    return (
        <div key={todo.id} className="ToDo__item">
            <input
                type="checkbox"
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <EditTodoModal data={todo} dispatch={dispatch} />
            <ButtonModal 
                action={onDeleteTodo} 
                message="Do you want to delete this task?" 
                buttonText="X" 
                className="Todo__delete"
            />
        </div>
    );
}

export default TodoItem;