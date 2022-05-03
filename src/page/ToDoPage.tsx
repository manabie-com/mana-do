import React, { useEffect, useReducer, useState, useRef } from 'react';
import reducer, { initialState } from '../store/reducer';
import {
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo,
    UpdateTodoContent
} from '../store/actions';
import Service from '../service';
import { Todo, TodoStatus } from '../models/todo';
import Button from '../components/Button';
import Input from '../components/Input';
import TodoItem from '../components/TodoItem';
import Checkbox from '../components/Checkbox';
import Modal from '../components/Modal';
import CardModal from '../components/Card';

type EnhanceTodoStatus = TodoStatus | TodoStatus.ALL;


const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>(TodoStatus.ALL);
    const [enteredTodo, setEnteredTodo] = useState("") as any
    const [isEdited, setIsEdited] = useState(null) as any
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const divRef = useRef<any>(null);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (enteredTodo.trim().length > 0) {
                if (!isEdited) {
                    const resp = await Service.createTodo(enteredTodo);
                    dispatch(createTodo(resp));
                } else {
                    dispatch(UpdateTodoContent(isEdited, enteredTodo))
                }
                setEnteredTodo("")
                setIsEdited(null)
            }
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId))
    }

    const closeModalHandler = () => {
        setIsModalOpened(false);
    };

    const openModalHandler = () => {
        setShowing(TodoStatus.DELETE)
        setIsModalOpened(true)
    };

    const onDeleteAll = () => {
        dispatch(deleteAllTodos())
        setIsModalOpened(false);
    }

    const showTodoList = (todoList: Todo[], status: string) => {
        switch (status) {
            case TodoStatus.ALL:
                return todoList
            case TodoStatus.ACTIVE:
                return todoList?.filter(todo => todo?.status === TodoStatus.ACTIVE)
            case TodoStatus.COMPLETED:
                return todoList?.filter(todo => todo?.status === TodoStatus.COMPLETED)
            default:
                return todoList
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (divRef.current && !divRef.current?.contains(event.target)) {
                setIsEdited(null)
                setEnteredTodo("")
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [isEdited]);

    return (
        <>
            {isModalOpened && (
                <Modal closeModalHandler={closeModalHandler}>
                    <CardModal deleteAllTodos={onDeleteAll} closeModalHandler={closeModalHandler} />
                </Modal>
            )}
            <div ref={divRef} className="ToDo__container">
                <div className="Todo__creation">
                    <Input value={enteredTodo} className="Todo__input" onChange={(e) => setEnteredTodo(e.target.value)} placeholder="What need to be done?" onKeyDown={onCreateTodo} />
                </div>
                <div className="ToDo__list">
                    {
                        showTodoList(todos, showing)?.map((todo) => {
                            return (
                                <TodoItem key={todo?.id} todo={todo} onCheck={onUpdateTodoStatus} setEnteredTodo={setEnteredTodo} onDelete={onDeleteTodo} setIsEdited={setIsEdited} />
                            );
                        })
                    }
                </div>
                <div className="Todo__toolbar">
                    {todos?.length > 0 &&
                        <Checkbox onChange={onToggleAllTodo} todoId="1" />}
                    <div className="Todo__tabs">
                        <Button title="All" onClick={() => setShowing(TodoStatus.ALL)} disabled={todos?.length === 0} active={showing === TodoStatus.ALL && todos?.length > 0} />
                        <Button title="Active" onClick={() => setShowing(TodoStatus.ACTIVE)} disabled={todos?.length === 0} active={showing === TodoStatus.ACTIVE && todos?.length > 0} />
                        <Button title="Completed" onClick={() => setShowing(TodoStatus.COMPLETED)} disabled={todos?.length === 0} active={showing === TodoStatus.COMPLETED && todos?.length > 0} />
                    </div>
                    <Button title="Clear all todos" disabled={todos?.length === 0} onClick={openModalHandler} active={showing === TodoStatus.DELETE && todos?.length > 0} />
                </div>
            </div>
        </>
    );
};

export default ToDoPage;