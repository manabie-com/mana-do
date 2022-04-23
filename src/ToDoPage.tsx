import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodo,
    deleteTodo,
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import { Button } from './components/common/button';
import { Modal } from './components/modal';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const [current, setCurrent] = useState<any>({})
    const inputRef = useRef<any>(null);
    const [currentType, setCurrentType] = useState('ALL');
   

    useEffect(()=>{
        getLocalStorageData();
    }, [])

    useEffect(() => {
        // storing input name
        if (todos) {
          localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const getLocalStorageData = () => {
        const data: any = localStorage.getItem("todos");
        const initialValue = JSON.parse(data);
        console.log(initialValue);
        
        dispatch(setTodos(initialValue));
    }

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' &&  inputRef.current.value.length > 0) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = '';
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleOpen = (id: string) => {
        const currentTodo = todos.find(todo => todo.id === id);
        if (currentTodo) {
            setValue(currentTodo.content)
            setCurrent(currentTodo);
            setIsOpen(true)
        }
    }

    const handleUpdate = () => {
        dispatch(updateTodo(current.id, value ));
        setIsOpen(false)
    }

    const handleDelete = (id: string) => {
        dispatch(deleteTodo(id))
    }

    const handleFilterTodo = (key: string) => {
        setCurrentType(key)

    }

    const generateData = (todos: any) => {
        switch (currentType) {
            case TodoStatus.ACTIVE:
                return todos.filter((todo: any) => todo.status === TodoStatus.ACTIVE);
            case TodoStatus.COMPLETED:
                return todos.filter((todo: any) => todo.status === TodoStatus.COMPLETED);
            default:
                return todos;
        }
    }

    return (
        <div className="ToDo__container">
            {isOpen && (
                <Modal 
                open={isOpen} 
                onClose={handleClose} 
                title='Update'
                onSubmit={handleUpdate}
                >
                    <input
                        className="Todo__input"
                        placeholder="What need to be done?"
                        value={value}
                        onChange={(e: any) => setValue(e.target.value)}
                    />
                </Modal>
            )}
            <h1>TODO LIST</h1>
            
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {
                    todos && generateData(todos).map((todo: any, index: any) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={todo.status === TodoStatus.COMPLETED ? true : false}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                <span onDoubleClick={() => handleOpen(todo.id)}>{todo.content}</span>
                                <Button
                                    className="Todo__delete"
                                    color='danger'
                                    onClick={() => handleDelete(todo.id)}
                                >
                                    x
                                </Button>
                            </div>
                        );
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <Button color='primary' onClick={()=>handleFilterTodo('ALL')}>
                        All
                    </Button>
                    <Button color="success" onClick={()=>handleFilterTodo(TodoStatus.ACTIVE)}>
                        Active
                    </Button>
                    <Button color="danger" onClick={()=>handleFilterTodo(TodoStatus.COMPLETED)}>
                        Completed
                    </Button>
                </div>
                <Button color="danger" className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </Button>
            </div>
        </div>
    );
};

export default ToDoPage;