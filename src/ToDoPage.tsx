import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    editTodo
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import TodoItem from './components/todo-item';
import Button from './components/button';
import Input from './components/input';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })();
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current && inputRef.current.value !== "") {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            resetInput();
        }
    }

    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
      const checked = e.target.checked;
      const res = await Service.editTodo(todoId, checked);
      if (res === true) {
        dispatch(updateTodoStatus(todoId, checked));
      }
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onEditTodo = async (id: string, newContent: string) => {
      const res = await Service.editTodo(id, newContent);
      if (res) {
        dispatch(editTodo(id, newContent));
      }
    }

    const resetInput = () => {
      if (inputRef.current) inputRef.current.value = '';
    }

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <Input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {
                    todos.map(todo => <TodoItem key={todo.id} todo={todo} onUpdateTodoStatus={onUpdateTodoStatus} onDelete={() => {}} onEdit={onEditTodo}/>)
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
                    <Button className="Action__btn">
                        All
                    </Button>
                    <Button className="Action__btn" onClick={()=>setShowing(TodoStatus.ACTIVE)} color="secondary">
                        Active
                    </Button>
                    <Button className="Action__btn" onClick={()=>setShowing(TodoStatus.COMPLETED)} color="success">
                        Completed
                    </Button>
                </div>
                <Button className="Action__btn" onClick={onDeleteAllTodo} color="error">
                    Clear all todos
                </Button>
            </div>
        </div>
    );
};

export default ToDoPage;