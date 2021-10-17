import React, {useEffect, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';

import reducer, {initialState} from '../../store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    editTodo
} from '../../store/actions';
import Service from '../../service';
import {Todo, TodoStatus} from '../../models/todo';
import {isTodoCompleted, setToLocalStorage} from '../../utils';
import ToDo from './Todo';
import Checkbox from '../../components/Checkbox';

import './style.css';
import { ROUTE_SIGNIN } from '../../routes';

type EnhanceTodoStatus = TodoStatus | 'ALL';
interface IActions {
  tab: string;
  onclick: () => void;
  active: number;
}

const ToDoPage = ({history}: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [active, setActive] = useState<number>(1);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    useEffect(() => {
        const newTodos = [...todos];
        setToLocalStorage(JSON.stringify(newTodos));
    },[todos]);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                inputRef.current.value = '';
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

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId));
    };

    const onEditTodo = async (todo: Todo) => {
        dispatch(editTodo(todo));
    };

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

    const onLogout = () => {
        localStorage.removeItem('token');
        history.replace(ROUTE_SIGNIN)
    }

    const className = (tab: number) => {
        if(active === tab) return 'active';
        return '';
    }

  const actions: IActions[] = [
    {
      tab: 'All',
      onclick: () => {
        setShowing('ALL');
        setActive(1);
      },
      active: 1,
    },
    {
      tab: 'Active',
      onclick: () => {
        setShowing(TodoStatus.ACTIVE);
        setActive(2);
      },
      active: 2,
    },
    {
      tab: 'Completed',
      onclick: () => {
        setShowing(TodoStatus.COMPLETED)
        setActive(3);
      },
      active: 3,
    },
  ];

  const renderActionsToolbar = () => (
        <div className='Todo__toolbar'>
            {todos.length > 0 ? (
                <Checkbox
                text={`${todos.length} items`}
                colorText='#'
                checked={activeTodos === 0}
                onChange={onToggleAllTodo}
                />
            ) : (
                <p>{todos.length} items</p>
            )}
            <div className='Todo__tabs'>
                {actions.map((action) => (
                <p
                    className={`Action__btn ${className(action.active)}`}
                    onClick={action.onclick}
                >
                    {action.tab}
                </p>
                ))}
            </div>
            <p className='Action__btn' onClick={onDeleteAllTodo}>
                Clear all todos
            </p>
        </div>
    );

    return (
      <div className='Todo-page'>
        <div className='logout' onClick={onLogout}>
          <RiLogoutCircleRLine className='logout-icon' />
        </div>
        <div className='ToDo__container'>
          <h1>To do list</h1>
          <div className='Todo__creation'>
            <input
              ref={inputRef}
              className='Todo__input'
              placeholder='What need to be done?'
              onKeyDown={onCreateTodo}
            />
          </div>
          <div className='ToDo__list'>
            {
              // React don't recommened using index for keys because the order of items may change
              showTodos.map((todo) => {
                return (
                  <ToDo
                    key={todo.id}
                    todo={todo}
                    onDeleteTodo={onDeleteTodo}
                    onUpdateTodoStatus={onUpdateTodoStatus}
                    onEditTodo={onEditTodo}
                  />
                );
              })
            }
          </div>
          <div className='Todo__divider' />
          <div className='Todo__toolbar'>{renderActionsToolbar()}</div>
        </div>
      </div>
    );
};

export default ToDoPage;