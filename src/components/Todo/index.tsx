import React, {useEffect, useReducer, useState, useRef} from 'react';
import reducer, {initialState} from '../../store/reducer';
import Header from '../Todo/Header';
import Footer from '../Todo/Footer';
import TodoList from '../Todo/TodoList';
import 'antd/dist/antd.css';
import {
    // setTodos,
    updateTodo,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    deleteTodo,
    updateTodoStatus
} from '../../store/actions';
import { message } from 'antd';


import Service from '../../service';
import {TodoStatus} from '../../models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [filteredTodo, setFliteredTodo] = useState<any>([]);
    const [editItem, setEditItem] = useState<any>(null);
    const inputRef = useRef<any>(null);
   

    useEffect(() => {     
        switch (showing) {
            case TodoStatus.COMPLETED:
                setFliteredTodo(todos.filter( i => i.status ===  TodoStatus.COMPLETED));               
                break;
            case TodoStatus.ACTIVE:
                setFliteredTodo(todos.filter( i => i.status ===  TodoStatus.ACTIVE));               
                break;
            default:           
                setFliteredTodo(todos);
                break;
        }
    }, [showing, todos])


    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current.value) {
                const resp = await Service.createTodo(inputRef.current.value.trim());
                dispatch(createTodo(resp));
                inputRef.current.value = '';
                message.success('Add new success!');                  
        }
        if (e.key === 'Enter' && !inputRef.current.value) {
            message.error('Can not add an empty to do');                  
    }
    }

    const onUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>, todoId: any) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
                const resp = await Service.createUpdateTodo(e.currentTarget.value.trim(), editItem.id, editItem.status);
                dispatch(updateTodo(resp,  editItem.id));
                setEditItem(null);
                message.success('Edit success!');
        }
        if (e.key === 'Enter' && !inputRef.current.value) {
            message.error('Can not edit to an empty to do');                  
    }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked));
        message.success('Update status success!');
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(!e.target.checked));
        if(!e.target.checked)
        message.success('All task are done!');
        else
        message.success('All task are undone!');
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }
    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId));
    }

    return (
        <section className="todoapp">
            <Header inputRef={inputRef} onCreateTodo={onCreateTodo}/>
            <TodoList 
                data={filteredTodo} 
                onDeleteTodo={onDeleteTodo} 
                onUpdateTodo={onUpdateTodo} 
                onUpdateTodoStatus={onUpdateTodoStatus} 
                editItem={editItem} 
                setEditItem={setEditItem}
                onToggleAllTodo={onToggleAllTodo}
                unCompletedCount={todos.filter( i => i.status !==  TodoStatus.COMPLETED).length}
                />
            <Footer unCompletedCount={todos.filter( i => i.status !==  TodoStatus.COMPLETED).length} status={showing} setStatus={setShowing} onDeleteAllTodo={onDeleteAllTodo} />
		</section>
    );
};

export default ToDoPage;