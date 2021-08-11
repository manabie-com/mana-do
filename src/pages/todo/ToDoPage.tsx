import React, {useEffect, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import authActions from '../../redux/actions/auth';
import todoActions from '../../redux/actions/todo';
import {authSelector} from '../../redux/slices/authSlice'
import {todoSelector} from '../../redux/slices/todoSlice'
import Input from '../../components/atoms/Input';
import Todos from '../../components/organisms/Todos'
import ButtonGroup from '../../components/molecules/ButtonGroup'
import Header from '../../components/atoms/Header'
import {TodoStatus, Todo} from '../../models/todo';
import {isTodoCompleted} from '../../utils';
import styles from './todo.module.scss';
type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({history}: RouteComponentProps) => {
    const dispatch = useDispatch()
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    const authState = useSelector(authSelector);
    const todoState = useSelector(todoSelector);
    useEffect(()=>{
        (async ()=>{
            if(!authState.token && history) {
                history.push('/');
            }
            todoActions.getTodos(dispatch);
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      
        if (e.key === 'Enter' && inputRef.current && inputRef.current.value.trim() !== '') {
            try {
                todoActions.addTodo(dispatch, inputRef.current.value.trim());
                inputRef.current.value = '';
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    const onCheckItem = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        todoActions.editTodoStatus(dispatch, todoId, e.target.checked ? 'COMPLETED' : 'ACTIVE');
    }
    const onEditTodo= async (e: React.KeyboardEvent<HTMLInputElement>, value: string, id: string) => {
        if (e.key === 'Enter' && value.trim() !== '') {
            todoActions.editTodo(dispatch, id, value);
        }
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        todoActions.toggleAllTodo(dispatch,e.target.checked);
    }

    const onDelete = (id: string) => {
        todoActions.deleteTodo(dispatch, id);
    }

    const onDeleteAllTodo = () => {
        todoActions.deleteAllTodo(dispatch);
    }
    
    const todos = todoState.todos;
    
    const showTodos = todos.filter((todo: Todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const onLogout = async () => {
        authActions.onLogout(dispatch);
        history.push('/');
        return false;
    }

    const activeTodos = todos.reduce(function (accum: number, todo: Todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);
    return (
       
        <div className="ToDo__container">
            <div style={{"display": "flex"}}>
                <Header>Todo Page</Header>
                <div style={{"marginTop": "27px"}}>Hello <b>{authState?.user?.username}</b>, <div style={{"display": "inline-block",'cursor': 'pointer'}} onClick={() => onLogout()}>Logout</div></div>
            </div>

            <div className={styles.Todo__creation}>
                <Input 
                    data-testid="input"
                    type="text"
                    innerRef={inputRef}
                    onKeyDown={onCreateTodo}
                    className="Todo__input"
                    placeholder="What need to be done?"
                />
            </div>
            <Todos todos={showTodos}
                onEditTodo={onEditTodo}
                onCheck={onCheckItem}
                onDelete={onDelete}
                activeTodos={activeTodos}  
                onChange={onToggleAllTodo} />
            <ButtonGroup handleClick={setShowing}  handleDelete={onDeleteAllTodo}/>
        </div>
    );
};

export default ToDoPage;