import React, { useContext, useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
    setTodos,
    createTodo,
    deleteAllTodos,
    actSignOut,
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { AppContext } from '../../store/context';
import AppButton from '../../commons/AppButton';
import AppTitle from '../../components/AppTitle';
import TodoList from '../../components/TodoList';
import AppRow from '../../commons/AppRow';
import AppCol from '../../commons/AppCol';
import AppText from '../../commons/AppText';
import AppInput from '../../commons/AppInput';
import { useNotAuthenticated } from '../../hooks/useNotAuthenticated';
import AppFooter from '../../components/AppFooter';

// type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({ history }: RouteComponentProps) => {
    useNotAuthenticated();
    const { state, dispatch } = useContext(AppContext);
    const { auth } = state;
    const inputRef = useRef<HTMLInputElement>(null);
    const [activeTab, setActiveTab] = useState(localStorage.getItem('filter')||'ALL');
    useEffect(() => {
        (async () => {
            try {
                const resp = await Service.getTodos();
                dispatch(setTodos(resp.data || []));

            } catch (error) {
                if (error.status === 401) {
                    history.push('/')
                }
            }
        })()
    }, [dispatch, history])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {

            try {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp.data));
                inputRef.current.value = '';
            } catch (e) {
                if (e.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    const onDeleteAllTodo = async () => {
        dispatch(deleteAllTodos());
        try {
            const response = await Service.clearTodos();
            console.log(response);
        } catch (error) {
            if (error.status === 401) {
                history.push('/');
            }
        }
    }

    const filterButtonsJSX = ():React.ReactNode => {
        return (<>
        <AppButton btnType={activeTab==='ALL'?'primary':'default'}  key="ALL" onClick={()=>{setActiveTab('ALL'); localStorage.setItem('filter','ALL')}}>All</AppButton>
        {Object.entries(TodoStatus).map(item=><AppButton key={item[0]} btnType={activeTab===item[1]?'primary':'default'} onClick={(e:React.MouseEventHandler<HTMLButtonElement>)=>{setActiveTab(item[1]); localStorage.setItem('filter',item[1])}}>{item[0]}</AppButton>)}
        </>)
    }

    const onClickSignOut = () => {
        dispatch(actSignOut());
        localStorage.removeItem('token');
        history.push('/');
    }

    return (
        <AppRow className="justify-content-center">
            <AppCol xs={5} sm ={9} md={10} lg={8} xl={8}>
            <div className="ToDo__container">
                <AppTitle />
                <p>Hi, <AppText strong>{auth.currentUser?.firstName || ''}</AppText><br /><AppButton btnType="link" href="#" onClick={onClickSignOut}>Sign out</AppButton></p>
                <div className="Todo__creation">
                    <AppInput
                        ref={inputRef}
                        className="Todo__input"
                        placeholder="What need to be done?"
                        onKeyDown={onCreateTodo}
                        style={{marginBottom: 20}}
                    />
                </div>                
                    <TodoList filter={activeTab}></TodoList>
                <div className="Todo__toolbar">
                    <div className="Todo__tabs">
                        {filterButtonsJSX()}
                    </div>
                    <AppButton btnType="primary" onClick={onDeleteAllTodo}>
                        Clear all
                    </AppButton>
                </div>
            </div>
            <AppFooter textColor="white" />
            </AppCol>
        </AppRow>
    );
};

export default ToDoPage;