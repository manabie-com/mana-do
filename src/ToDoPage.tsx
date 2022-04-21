import React from 'react';
import {useEffect, useReducer, useRef, useState} from 'react';
import { Button, Input, Space, Form } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    activeAllTodos,
    completeAllTodos,
    deleteTodo,
    editTodo
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);
    const inputEditRef = useRef<any>(null);
    const [edit, setEdit] = useState(false);
    const [keyEdit, setKeyEdit] = useState(0);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [form] = Form.useForm();
    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
            document.addEventListener('click', handleClickOutside, true);
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && form.getFieldValue("input-create") ) {
            const resp = await Service.createTodo(form.getFieldValue("input-create"));
            dispatch(createTodo(resp));
        }
    }

    const onEditTodo = async (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
        if (e.key === 'Enter' && form.getFieldValue("edit-create") ) {
            dispatch(editTodo(todoId, form.getFieldValue("edit-create")));
            setEdit(false)
        }
    }

    const onUpdateTodoStatus = (e: any, todoId: string) => {
        console.log(e.target.checked)
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onActiveAllTodo = () => {
        dispatch(activeAllTodos())
    }

    const onCompleteAllTodo = () => {
        dispatch(completeAllTodos())
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());      
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId));        
    }

    const handleClickOutside = (event: Event) => {
        if (
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target as Node)
        ) {
            setEdit(false);
        }
    };
    return (
        <Space className="ToDo__container" direction="vertical" size="middle">
            <Form form={form}>
            <Form.Item className="Todo__creation" name="input-create"
             rules={[
                { required: true, message: "Not input blank value !!!" }]}
            >
                <Input
                    ref={inputRef}
                    className="Todo__input"
                    data-testid= "Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </Form.Item>
            <div className="ToDo__list">
                {
                    todos.map((todo, index) => {
                        return (
                            //index is number not id, so onUpdateTodoStatus must have para todo.id
                            <div key={index} className="ToDo__item" data-testid= "Todo__item">
                                <input
                                    type={"checkbox"}
                                    checked={ todo.status === TodoStatus.COMPLETED }
                                    onChange={(e) => { onUpdateTodoStatus(e, todo.id) }}
                                />
                                {/* <span>{todo.content}</span> */}
                                {(edit && keyEdit === index) ? 
                                    (<div ref={wrapperRef}> 
                                        <Form.Item name="edit-create" className="ToDo__edit" initialValue={todo.content}
                                        rules={[
                                            { required: true, message: "Not input blank value !!!" }]}
                                        >
                                        <Input ref={inputEditRef} style={{width: 350}} type='text' onKeyDown={ (e) => onEditTodo(e, todo.id) } />
                                        </Form.Item>
                                    </div>) : 
                                    (<span onDoubleClick={() => { setEdit(true); setKeyEdit(index) }}>{todo.content}</span>)}
                                                             
                                <Button
                                    className="Todo__delete"
                                    onClick={() => {onDeleteTodo(todo.id)}}
                                    icon={<CloseOutlined/>}
                                >
                                </Button>
                            </div>
                        );
                    })
                }
            </div>
            </Form>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <Button type={"primary"}>
                        All
                    </Button>
                    <Button type={"primary"} onClick={()=> onActiveAllTodo()}>
                        Active
                    </Button>
                    <Button type={"primary"} onClick={()=> onCompleteAllTodo() }>
                        Completed
                    </Button>
                </div>
                <Button type={"primary"} onClick={onDeleteAllTodo}>
                    Clear all todos
                </Button>
            </div>
        </Space>
    );
};

export default ToDoPage;