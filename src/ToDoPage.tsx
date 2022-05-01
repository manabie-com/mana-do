import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo,
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import { getRandomInt } from './helpers';
import { MOTIV_MSG1, MOTIV_MSG2, MOTIV_MSG3 } from './constants';

const ALL: string = "ALL";
type EnhanceTodoStatus = TodoStatus | typeof ALL;

const motivationalMsg: string[] = [
    MOTIV_MSG1,
    MOTIV_MSG2,
    MOTIV_MSG3,
];

const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>(ALL);
    const inputRef = useRef<any>(null);
    const [motivationMessage, setMotivationalMessage] = useState<string>(motivationalMsg[0]);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, []);

    useEffect(() => {
        if (showing === TodoStatus.COMPLETED) {
            setMotivationalMessage(motivationalMsg[getRandomInt(3)]);
        }
    }, [showing]);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
                                // prevent add new todo if input value is empty
        if (e.key === 'Enter' && inputRef.current.value) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = ""; // clear input value
            setShowing(TodoStatus.ACTIVE); // avoid confusing for user experience
        }
    };

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => dispatch(updateTodoStatus(todoId, e.target.checked));

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(toggleAllTodos(e.target.checked));

    const onDeleteAllTodo = () => dispatch(deleteAllTodos());

    const onDeleteTodoById = (todiId: any) => dispatch(deleteTodo(todiId));

    const filterTodosList = (status: string) => {
        if (showing === ALL) {
            return true
        } else if (showing === status) {
            return true;
        } else {
            return false;
        }
    };

    const checkTodosByStatus = () => {;
        const result = todos.find(item => item.status === showing);

        if (!result && showing !== ALL) {
            if (todos.length > 0) {
                if (showing === TodoStatus.COMPLETED) {
                    return <>
                        <small>You don't have yet finish to do.</small>
                        <p>{motivationMessage}</p>
                    </>;
                } else {
                    return "Wow, All of your to do's are completed! 🎉";
                }
            }
        }
    };

    const getTabsBtnStatus = (bool: boolean) => bool ? 'active' : '';

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
            <small className='Todo__note'>Press ENTER to add your TODO</small>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className={`Action__btn ${getTabsBtnStatus(showing === ALL)}`} onClick={()=>setShowing(ALL)}>
                        All
                    </button>
                    <button className={`Action__btn ${getTabsBtnStatus(showing === TodoStatus.ACTIVE)}`} onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className={`Action__btn ${getTabsBtnStatus(showing === TodoStatus.COMPLETED)}`} onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
            <div className="ToDo__list">
                {
                    todos.map((todo, index) =>
                        filterTodosList(todo.status) && <div key={index} className="ToDo__item">
                            <input
                                type="checkbox"
                                checked={todo.status === TodoStatus.COMPLETED}
                                onChange={e => onUpdateTodoStatus(e, todo.id)}
                            />
                            <span className={`todo__${todo.status}`}>{todo.content}</span>
                            <button
                                className="Todo__delete"
                                onClick={() => onDeleteTodoById(todo.id)}
                            >
                                X
                            </button>
                        </div>
                    )
                }
                {checkTodosByStatus()}
                {
                    todos.length === 0
                    && <div className='toDo__message'>
                            <h4>MANABIE TO DO</h4>
                            <p>Free up your mental space, gives you focus, from work to play.</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default ToDoPage;