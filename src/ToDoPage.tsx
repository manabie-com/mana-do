import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteTodo,
    deleteAllTodos,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' ) {
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

    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId));
    }

    const onFilterTodo = (value: string) => {
        value === 'ACTIVE' ? setShowing(TodoStatus.ACTIVE) 
        : value === 'COMPLETED' ? setShowing(TodoStatus.COMPLETED)
        : setShowing('ALL') 
    }

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <div className="Todo__checkbox__wrapper">
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
                {/* onClick={()=>setShowing('ALL')} */}
                
                <Button variant="secondary" onClick={onDeleteAllTodo}>
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
                                <td>{index + 1}</td>
                                <td >
                                    <div className="Todo__checkbox__wrapper">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                        checked={todo.status === TodoStatus.COMPLETED}
                                    />
                                    <span>{todo.content}</span>
                                    </div>
                                </td>
                                <td>{todo.created_date.substring(0, 10)}</td>
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