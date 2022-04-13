import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteTodo,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import TodoModal from './component/TodoModal/TodoModal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [editElement, setEditElement] = useState(-1);
    const [newContent, setNewContent] = useState('');
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

    useEffect(()=> {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const onCreateTodo = async () => {        
        if(inputRef.current.value.trim() !== ''){
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

    const onOpenModal = () => {
        setOpenModal(true);
    }
    
    const onEditTodo = (index: number) => {
        setEditElement(index)
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId));
    }

    const onUpdateTodo = (e: React.KeyboardEvent<HTMLInputElement>, todoId: any) => {
        if(e.key === 'Enter') {
            dispatch(updateTodoContent(todoId, newContent));
            setEditElement(-1)
        }
    }

    const onFilterTodo = (value: string) => {
        value === 'ACTIVE' ? setShowing(TodoStatus.ACTIVE) 
        : value === 'COMPLETED' ? setShowing(TodoStatus.COMPLETED)
        : setShowing('ALL') 
    }

    return (
        <div className="ToDo__container">
            <TodoModal show={openModal} setShow={setOpenModal} onDeleteAlltodo={onDeleteAllTodo}/>
            <div className="Todo__creation">
                <Button role='addToTodos' size="sm" onClick={onCreateTodo} variant="outline-secondary">Add</Button>
                <input
                    role='addTodo'
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={e => {
                        if(e.key === 'Enter') {
                            onCreateTodo()
                        }
                    }}
                />
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <div className="Todo__select__wrapper">
                        <input
                            type="checkbox"
                            onChange={onToggleAllTodo}
                        /><label>Select All</label>
                    </div> : <div/>
                }
                <div className="Todo__select__wrapper">
                    <label>Filter: </label>
                    <Form.Control size="sm" className="Todo__select" as="select" onChange={(e) => {onFilterTodo(e.target.value)}}>
                        <option value="ALL">All</option>
                        <option value={TodoStatus.ACTIVE}>Active</option>
                        <option value={TodoStatus.COMPLETED}>Completed</option>
                    </Form.Control>
                </div>
                
                <Button variant="secondary" onClick={onOpenModal}>
                    Clear all todos
                </Button>
            </div>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task Name</th>
                        <th>Date</th>
                        <th className="Todo__progress">Progress</th>
                    </tr>
                </thead>
                <tbody>
                {todos.map((todo, index) => {
                    if(todo.status === showing || showing === 'ALL') {
                        return (
                            <tr key={index}>
                                <td ><div className="Todo__date">{index + 1}</div></td>
                                <td >
                                    <div className="Todo__checkbox__wrapper" >
                                        <input
                                            type="checkbox"
                                            onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                            checked={todo.status === TodoStatus.COMPLETED}
                                        />
                                        <div className="Todo__name" onDoubleClick={() => {onEditTodo(index)}}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                                            {editElement === index
                                                ? <input 
                                                    autoFocus
                                                    onChange={e => {setNewContent(e.target.value)}}
                                                    onBlur={() => {setEditElement(-1)}}
                                                    onKeyDown={e => {onUpdateTodo(e, todo.id)}} 
                                                  /> 
                                                : <span>{todo.content}</span>
                                            }
                                        </div>
                                    </div>
                                </td>
                                <td><div className="Todo__date">{todo.created_date.substring(0, 10)}</div></td>
                                <td >
                                    <div className="Table__btn__wrap">
                                        <Button disabled variant={todo.status === TodoStatus.COMPLETED 
                                            ? "outline-success" 
                                            : "outline-warning"} size="sm">
                                            {todo.status}
                                        </Button>
                                        <Button variant="danger" size="sm"
                                            onClick={() => {onDeleteTodo(todo.id)}}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    }
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default ToDoPage;