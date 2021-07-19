import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import todoReducer, { initialState } from '../../store/reducers/todo';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodo
} from '../../store/actions/todo';
import TodoService from '../../service/to-do';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import styled from 'styled-components'
import TextField from '../../components/TextField';
import TodoList from '../../components/TodoList';
import Checkbox from '../../components/Checkbox';
import { PrimaryButton, SecondaryButton, TertiaryButton, DangerButton } from '../../components/Button';
import { Title } from '../../components/Title';


export const ErrorMsg = styled.h3
`   
    text-align: center;
    color: red;
`

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({ history }: RouteComponentProps) => {
    const [{ todos }, dispatch] = useReducer(todoReducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [todoContent, setTodoContent] = useState<string>();
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        (async () => {
            const resp = await TodoService.getTodos();

            dispatch(setTodos(resp.data || []));
        })()
    }, [])

    const showErrorMsg = (msg: string) => {
        setErrorMsg(msg)
        setTimeout(() => {
            setErrorMsg("")
        }, 3000)
    }

    const onUpdateTodoContent = async (todoId: string, todoContent: string) => {
        if (todoId && todoContent) {
            const res = await TodoService.updateTodo(todoId, todoContent)
            if (res.statusCode === 200) {
                dispatch(updateTodo(res.data))
            } else {
                showErrorMsg(res.message)
            }
        }
    }

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && todoContent) {
            try {
                const res = await TodoService.createTodo(todoContent);
                if (res.statusCode === 200) {
                    dispatch(createTodo(res.data));
                    setTodoContent("")
                } else {
                    showErrorMsg(res.message)
                }
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

    const onDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id))
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
            <Title>Todos</Title>
            <div className="Todo__creation">
                <TextField
                    data-testid="add-todo"
                    className="Todo__input"
                    placeholder="What need to be done?"
                    value={todoContent}
                    onChange={e => setTodoContent(e.target.value)}
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div style={{ textAlign: 'left', marginTop: 30 }}>
                {todos.length > 0 ? (
                    <Checkbox
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                        id="checkall"
                    />
                )
                    : <div />
                }
            </div>
            <TodoList
                onUpdateTodoContent={onUpdateTodoContent}
                onUpdateTodoStatus={onUpdateTodoStatus}
                onDeleteTodo={onDeleteTodo}
                todos={showTodos} 
                data-testid="todo-list"
                />
            {errorMsg != "" && (
                <ErrorMsg>
                    {errorMsg}
                </ErrorMsg>
            )}
            <div className="Todo__toolbar">
                <div className="Todo__tabs">
                    <PrimaryButton className="Action__btn" onClick={() => setShowing('ALL')}>
                        All
                    </PrimaryButton>
                    <SecondaryButton className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </SecondaryButton>
                    <TertiaryButton className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </TertiaryButton>
                </div>
                <DangerButton className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </DangerButton>
            </div>
        </div>
    );
};

export default ToDoPage;