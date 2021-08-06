import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from '../../store/todoActions';
import Service from '../../service';
import {TodoStatus} from '../../models/todo';
import {isTodoCompleted} from '../../utils';

import ButtonBase from '../../components/atoms/ButtonBase';
import TextFields from '../../components/atoms/TextFields'

import {useSelector,useDispatch} from 'react-redux'
import {todoSelector} from '../../selectors/todo.selector'

type EnhanceTodoStatus = TodoStatus | 'ALL';

export type IHistory = {
    push(url: string): void;
    replace(url: string): void;
  };

const ToDo: React.FunctionComponent = () => {
    const {todos}:any = useSelector(todoSelector)
    const dispatch = useDispatch()
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [value, setValue] = useState('');
    const history = useHistory()
    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value !== "") {
            try {
                const resp = await Service.createTodo(value);
                dispatch(createTodo(resp));
                setValue('')
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/login')
                }
            }
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

    const showTodos = todos.length>0 && todos?.filter((todo:any) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const activeTodos = todos.reduce(function (accum:any, todo:any) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);
    
    const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value)
    }

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <TextFields
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onChange={onChangeTodo}
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {
                    showTodos.length>0 && showTodos.map((todo:any, index:number) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                <span>{todo.content}</span>
                                <ButtonBase
                                    handleSubmit={() => dispatch(deleteTodo(todo.id))}
                                    text="X"
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
                    <ButtonBase handleSubmit={()=>setShowing('ALL')} text="All"/>
                    <ButtonBase handleSubmit={()=>setShowing(TodoStatus.ACTIVE)} text="Active"/>
                    <ButtonBase handleSubmit={()=>setShowing(TodoStatus.COMPLETED)} text="Completed"/>
                </div>
                <ButtonBase textColor="#ecf0f1" bgColor="#c0392b" handleSubmit={onDeleteAllTodo} text="Clear All Todos"/>
            </div>
        </div>
    );
};

export default ToDo;