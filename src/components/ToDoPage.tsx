import React, {
    useEffect, 
    useReducer, 
    useState}                   from 'react';
import { FaTrashAlt, FaPen }    from "react-icons/fa";
import { HiPlusCircle }         from "react-icons/hi";
import reducer, {initialState}  from '../store/reducer';
import DatePicker               from "react-datepicker";
import moment                   from 'moment';

import {
    setTodoList,
    createTodo,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo, 
    modifyTodo,
    updateAllTodos}             from '../store/actions';
import Service                  from '../service';
import InputComponent           from './inputComponent/inputComponent';

import "react-datepicker/dist/react-datepicker.css";
import './index.css';
import { ITodoItem } from '../models/todo';

const ToDoPage = () => {

    const [state           , dispatch           ] = useReducer(reducer, initialState);
    const [todoContent     , setTodoContent     ] = useState("");
    const [startDate       , setStartDate       ] = useState<Date | null>(new Date());
    const [isOpenTodoModal , setIsOpenTodoModal ] = useState<Boolean>(false);
    const [submitType      , setSubmitType      ] = useState<String>();
    const [modalTitle      , setModalTitle      ] = useState<String>();
    const [modifyTodoID    , setModifyTodoID    ] = useState<String>();

    const getData = async () => {
        const response = await Service.getTodoList();
        dispatch(setTodoList(response || []));
    }
    useEffect(()=>{
        getData();
    }, [])

    const openTodoModal = () => {
        setIsOpenTodoModal(true);
    }

    const closeTodoModal = () => {
        setIsOpenTodoModal(false);
        switch(submitType) {
            case "newTodo": { 
                const todoItem = {
                    content     : todoContent,
                    created_date:  moment(startDate).format('YYYY-MM-DD HH:MM:SS')
                }
                onCreateTodo(todoItem);
            };break;

            case "modifyTodo": {
                const modifyItem = {
                    id          : modifyTodoID,
                    newContent  : todoContent,
                    newDate     : moment(startDate).format('YYYY-MM-DD HH:MM:SS')
                }
                onModifyTodoItem(modifyItem);
            };break;
            default: break;
        }
    }

    const newTodoItem = () => {
        setModalTitle("New Todo Item");
        setSubmitType("newTodo");
        openTodoModal();
    }

    const onModifyTodo = (todoItem: any) => {
        setModalTitle("Modify Todo Item");
        setSubmitType("modifyTodo");
        setModifyTodoID(todoItem.id);
        openTodoModal();
    }

    const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setTodoContent(newValue);
    }

    const onCreateTodo = async (todoItem:any) => {
        const response = await Service.createTodoItem(todoItem);
        dispatch(createTodo(response));
        localStorage.setItem("todoItem", JSON.stringify(state.todoList));
    }

    const onModifyTodoItem = async (todoItem: any) => {
        const response = await Service.ModifyTodoItem(todoItem);
        dispatch(modifyTodo(response));
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked));
    }

    const onUpdateAllTodoStatus = (statusValue:any) => {
        console.log(statusValue)
        dispatch(updateAllTodos(statusValue))
    }

    const onDeleteTodoItemById = (todoId: any) => {
        console.log("deleted item by ID", todoId);
        dispatch(deleteTodo(todoId));
    }

    const onDeleteAllTodo = () => {
        console.log("go to deleted")
        dispatch(deleteAllTodos());
    }


    const renderTodoList = () => {
        return (
            <div className="todo__list">
                {
                    state.todoList.map((todo, index) => {
                        return (
                            <div key={index} className="todo__item">
                                <input
                                    type="checkbox"
                                    checked={todo.status === "COMPLETED" ? true : false}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                <div className='todo-content__box'>
                                    <span className='todo-content__style'>
                                        {todo.content}
                                    </span>
                                    <span className='todo-content__style date-time__content'>
                                        {todo.created_date}
                                    </span>
                                </div>
                                <FaPen 
                                    className="todo__delete"
                                    onClick={() => onModifyTodo(todo)}/>
                                <FaTrashAlt 
                                    className="todo__delete"
                                    onClick={() => onDeleteTodoItemById(todo.id)}/>
                            </div>
                        );
                    })
                }
            </div>
        )
    }

    const renderTodoModal = () => {
        return (
            <div 
                className='new-todo__container'>
                <div className='todo-title__box'>
                    <span>{modalTitle}</span>
                </div>
                <div className='todo-item__box'>
                    <InputComponent onChangeContent={onChangeContent}/>
                </div>
                <div className='todo-item__box'>
                    <span>Date time:</span>
                    <DatePicker
                        className='date-time__container'
                        selected={startDate}
                        showTimeSelect
                        dateFormat="Pp"
                        onChange={date => setStartDate(date)}/>
                </div>
                <div className='button-box_container'>
                    <div className='submit__box'>
                        <button 
                            className="submit__btn"
                            onClick={closeTodoModal}>
                            Submit
                        </button>
                    </div>
                    <div className='submit__box'>
                        <button 
                            className="submit__btn"
                            onClick={() => setIsOpenTodoModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="todo__container">
            <h1>TO DO LIST</h1>
            <div 
                className="todo__item check-all"
                onClick={newTodoItem}>
                <div className='plus__icon-container'>
                    <HiPlusCircle className="plus__icon"/>
                </div>
                <span className='todo-content__style'>New to do item</span>
            </div>
            {renderTodoList()}
            <div className="todo__toolbar">
                <div className="todo__tabs">
                    <button className="Action__btn" onClick={()=> onUpdateAllTodoStatus(false)}>
                        Active All
                    </button>
                    <button className="Action__btn" onClick={()=> onUpdateAllTodoStatus(true)}>
                        Completed All
                    </button>
                </div>

                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
            {isOpenTodoModal ? renderTodoModal() : null}
        </div>
    );
};

export default ToDoPage;