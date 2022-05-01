import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';
import TodoItem from './component/todo-item';
import ButtonModal from './component/button-modal';
import { Table } from 'reactstrap';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);
    const [isEnter, setIsEnter] = useState(true);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])


    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isEnter) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            setIsEnter(false);
        }
    }

    const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        for (let t of todos) {
            await Service.updateTodo({ ...t, status });
        }

        dispatch(toggleAllTodos(checked))
    }

    const onDeleteAllTodo = async () => {
        for (let t of todos) {
            await Service.deleteTodo(t.id);
        }
        dispatch(deleteAllTodos());
    }

    return (
        <div className="ToDo__container">
            <h1>ToDo App</h1>
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyUp={(e) => {
                        setIsEnter(true);
                        onCreateTodo(e)
                    }}
                />
            </div>
            <div className="ToDo__list">
                <Table striped>
                    <tbody>
                        {
                            todos
                                .filter((todo) => showing === 'ALL' || todo.status === showing)
                                .map((todo) => <tr><TodoItem todo={todo} dispatch={dispatch} /></tr>)
                        }
                    </tbody>
                </Table>

            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className="Action__btn bg-secondary" onClick={() => setShowing('ALL')}>
                        All
                    </button>
                    <button className="Action__btn bg-info" onClick={() => setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn bg-primary" onClick={() => setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <ButtonModal
                    action={onDeleteAllTodo}
                    message="Do you want to clear all tasks?"
                    buttonText="Clear all todos"
                    className="Action__btn bg-danger"
                />
            </div>
        </div>
    );
};

export default ToDoPage;