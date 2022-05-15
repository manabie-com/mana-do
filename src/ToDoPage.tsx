import React, {useEffect, useRef, useState} from 'react';

import {useApiCallReducer} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import Item from './components/Item'

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
    const [{todos}, dispatch] = useApiCallReducer()
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);
    const [hadEnter, setHadEnter] = useState<boolean>(false);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            dispatch(setTodos(resp));
            inputRef.current.focus()
        })()
    }, [])

   
    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {        
        if (e.key === 'Enter' && !hadEnter && inputRef.current.value !== '') {
            setHadEnter(true)
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            
        }
        else if(e.key !== 'Enter'){
            setHadEnter(false)
        }
        inputRef.current.value = '';
    }


    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const handleUpdateStatus = (id: string, checked: boolean) =>{
        dispatch(updateTodoStatus(id, checked))
    }

    const handleDelete = (id: string) =>{
        dispatch(deleteTodo(id))
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
            <div className="ToDo__list">
                {
                    todos.filter(todo =>{
                        if(showing === 'ALL') {
                            return true
                        }
                        else{
                            if(todo.status === showing){
                                return true
                            }
                            return false
                        }
                        
                    }).map((todo, index) => {
                        return (
                            <Item todo={todo} key={index} updateStatus={handleUpdateStatus} deleteTodo={handleDelete}/>
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
                    <button className="Action__btn" onClick={()=>setShowing('ALL')}>
                        All
                    </button>
                    <button className="Action__btn" onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;