import React, {useEffect, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodo
} from './store/actions';
import Service from './service';
import {TodoStatus , Todo} from './models/todo';
import {isTodoCompleted} from './utils';

import {ToDoContainer , ToDoTabs , ToDoItem} from './components';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const version = "1.0";

const ToDoPage = ({history}: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const _token = localStorage.getItem('token');
    if(_token){
        const keyStorage = _token + "-" + version + "-todos";
        const getTodos = () =>{
            const  resp =  JSON.parse(localStorage.getItem(keyStorage) as string);
            dispatch(setTodos(resp || []));
        };
        getTodos();
    }else{
        history.push('/')
    }
  }, []);

   const saveTodos = () =>{
    const keyStorage = localStorage.getItem('token') + "-" + version  + "-todos";
    const _beforeunload = () =>{
        localStorage.setItem(keyStorage, JSON.stringify(todos));
    }
    window.removeEventListener("beforeunload",_beforeunload);
    window.addEventListener('beforeunload',_beforeunload);
    }
    saveTodos();


    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current && inputRef.current.value !== "" && inputRef.current.value !== null  && inputRef.current.value !== undefined  ) {
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                inputRef.current.value = '';
                inputRef.current.focus();
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
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

    const showTodos = todos.filter((todo : Todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const activeTodos = todos.reduce(function (accum: any, todo : Todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (
        <div className="ToDo__container">
          <ToDoContainer _ref={inputRef} onCreateTodo={onCreateTodo}/>
          <ToDoTabs  
            todos={todos}
            activeTodos={activeTodos}
            onToggleAllTodo={onToggleAllTodo}
            TodoStatus={TodoStatus}
            onDeleteAllTodo={onDeleteAllTodo}
            setShowing={setShowing}
            showing={showing}
          />
            <div className="ToDo__list">
                {
                    showTodos.map((todo: Todo) => {
                        return (
                        <ToDoItem 
                            key={todo.id}
                            todo={todo}
                            isTodoCompleted={isTodoCompleted}
                            onUpdateTodoStatus={onUpdateTodoStatus}
                            dispatch={dispatch}
                            updateTodo={updateTodo}
                            deleteTodo={deleteTodo}
                        ></ToDoItem>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default ToDoPage;