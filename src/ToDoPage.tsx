import React, { useEffect, useReducer, useState } from 'react';
import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,    
    toggleAllTodos,
    deleteAllTodos,
    deleteTodo,
    updateTodoStatus
} from './store/actions';
import TodoStatusCard from './components/TodoStatusCard'
import Service from './service';
import { TodoStatus } from './models/todo';
import { isTodoCompleted } from './utils';
import TodoItem from './components/TodoItem'

// type EnhanceTodoStatus = TodoStatus | 'ALL'; **Hard code constant

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);    
    const [showing, setShowing] = useState<TodoStatus>(TodoStatus.ALL);
    const [titleName, setTitleName] = useState<string>('')
    const [percentCompleted, setPercentCompleted] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
        recalculatePercentage()
    }, [])

    const onCreateTodoClickBtn = async () => {
        if (titleName) {
            onCreateTodo()
        }    
    }

    const onCreateTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && titleName) {
            onCreateTodo()
        }        
    }

    const onCreateTodo = async () => {
        const resp = await Service.createTodo(titleName);            
        dispatch(createTodo(resp));
        setTitleName('')
        recalculatePercentage()
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
        recalculatePercentage()
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());          
        recalculatePercentage()
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId))
        recalculatePercentage()
    }

    const recalculatePercentage = () => {
        setPercentCompleted(calculatePercentOfCompletedTask)        
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
        recalculatePercentage()
    }

    const showTodos = todos.filter((todo) => {
        switch (showing) {            
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return todo;
        }
    });

    const calculatePercentOfCompletedTask = () => {        
        if(!todos.length) return 0
        const completedTodos = todos.filter((todo) => {
            return todo.status === TodoStatus.COMPLETED;
        })

        const percentageOfCompleted = (completedTodos.length/todos.length)*100;
        return percentageOfCompleted;
    }

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (
        //Naming convention
        <div className="todo-container">
            <h3>What's up, Huy!</h3>
            <div className="todo-creation">                              
                <input
                    className="todo-input"
                    placeholder="What need to be done?"
                    value={titleName}
                    onChange={(e) => setTitleName(e.target.value)}  
                    onKeyDown={onCreateTodoKeyDown}                 
                />
                <button className='add-todo-btn' onClick={onCreateTodoClickBtn}>
                    Add
                </button>
            </div>            
            <div className="todo-toolbar">                
                {showTodos.length ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="todo-tabs">
                    <span onClick={() => setShowing(TodoStatus.ALL)}><TodoStatusCard title='All' value={0} className={showing === TodoStatus.ALL ? 'all-todo-status-card-active' : ""}></TodoStatusCard></span>
                    <span onClick={() => setShowing(TodoStatus.ACTIVE)}><TodoStatusCard title='Active' value={0} className={showing === TodoStatus.ACTIVE ? 'active-todo-status-card-active' : ""}></TodoStatusCard></span>
                    <span onClick={() => setShowing(TodoStatus.COMPLETED)}><TodoStatusCard title='Completed' value={percentCompleted} className={showing === TodoStatus.COMPLETED ? 'completed-todo-status-card-active' : ""}></TodoStatusCard></span>                    
                </div>                
            </div>
            <div className='action-section'>
                <button className="delete-btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
            <div className="todo-list">
                {
                    showTodos.length ? showTodos.map((todo, index) => {
                        return (
                            <div key={index}>
                                <TodoItem todo={todo} onUpdateTodoStatus={onUpdateTodoStatus} onDeleteTodo={onDeleteTodo} recalculatePercentage={recalculatePercentage}></TodoItem>                       
                            </div>
                        );
                    }) : (
                        <div className='empty-data-notification'>
                            There are nothing here
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ToDoPage;