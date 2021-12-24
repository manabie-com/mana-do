import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    startEditTodo,
    endEditTodo,
    keyEditTodo,
    cancelEditTodo,
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import {isTodoCompleted} from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos, editIndex}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    // Lấy input Ref
    const inputEditRef = useRef<HTMLInputElement>(null);
    // console.log(todos)
    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    // Mỗi khi todos thay đổi chạy làm useEffect để set lại localStorage
    useEffect(()=>{
        console.log('todo change')
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            // trim() loại bỏ '' và phủ định để không cho phép add khi value rỗng or '' 
            if(!inputRef.current.value.trim()) {
                alert('Vui lòng không để trống!')
            } else {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                inputRef.current.value = '';
                // inputRef.current.focus();

            }
        }
    }

    const onEditTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        // khi nhấn Enter thực hiện add todo
        if (e.keyCode === 13 && inputEditRef.current) {
            const resp = await Service.createTodo(inputEditRef.current.value);
            dispatch(keyEditTodo(resp));
        }
        console.log('editing done')
    }

    
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        // kiểm tra có value thì cho phép edit
        if(e.target.value){
            const changeText = (e.target.value)
            dispatch(endEditTodo(index, changeText));
        }
    }


    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }
    

    const showTodos = todos.filter((todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    

    return (
        <div className="ToDo__container">
            <h1 className="heading">Todo App</h1>
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
                    showTodos.map((todo, index) => {
                        return (
                            <div 
                                key={index} 
                                // kiểm tra editIndex = index thì thêm class editing hiện input edit
                                className={`ToDo__item ${editIndex === index && 'editing'}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                <span
                                    // dblClick thực hiện Start edit todo
                                    onDoubleClick={() => dispatch(startEditTodo(index))}
                                    // status = completed thêm active để tạo hiệu ứng active
                                    className={`${todo.status === 'COMPLETED' ? 'active' : ''}`}
                                >
                                    {/* {console.log('status :',todo.status)} */}
                                    {todo.content}
                                </span>
                                <button
                                    className="Todo__delete"
                                    onClick={() => dispatch(deleteTodo(todo.id))}
                                >
                                    X
                                </button>
                                <input 
                                    ref={inputEditRef}
                                    className="edit" 
                                    value={todo.content}
                                    // Khi key up gọi hàm onEditTodo
                                    onKeyUp={onEditTodo}
                                    // khi thấy value thay đổi gọi hàm handleEditChange
                                    onChange={(e) => handleEditChange(e, index)}
                                    // khi blur ra ngoài gọi hàm cancelEditTodo
                                    onBlur={() => dispatch(cancelEditTodo())}
                                />
                            </div>
                        );
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button 
                        // kiểm tra showing = all thì thêm class active khi click
                        className={`"Action__btn" ${showing === 'ALL' ? 'active' : ''}` }
                        onClick={()=>setShowing('ALL')}
                    >
                        All
                    </button>
                    <button 
                        // kiểm tra showing = active thì thêm class active khi click
                        className={`"Action__btn" ${showing === 'ACTIVE' ? 'active' : ''}` }
                        onClick={()=>setShowing(TodoStatus.ACTIVE)}
                    >
                        Active
                    </button>
                    <button 
                        // kiểm tra showing = completed thì thêm class active khi click
                        className={`"Action__btn" ${showing === 'COMPLETED' ? 'active' : ''}` }
                        onClick={()=>setShowing(TodoStatus.COMPLETED)}
                    >
                        Completed
                    </button>
                    <button className="Action__btn" onClick={onDeleteAllTodo}>
                        Clear all todos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToDoPage;