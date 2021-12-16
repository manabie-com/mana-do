import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from '../store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent
} from '../store/actions';
import Service from '../service';
import { TodoStatus } from '../models/todo';
import { isTodoCompleted } from '../utils';
import TodoList from '../components/TodoList';
import TodoTabs from '../components/TodoTabs';
import Button from '../components/Button';
import Input from '../components/Input';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = useCallback(async (key: string) => {
        if (key === 'Enter' && inputRef.current) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp.data));
            inputRef.current.value = '';
        }
    }, [])

    const onUpdateTodoStatus = useCallback(async (todoId: string, checked) => {
        const resp = await Service.updateTodo({
            todoId: todoId,
            status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        })
        if (resp.status === "success") {
            dispatch(updateTodoStatus(todoId, checked))
        } else {
            console.log(resp.message)
        }
    }, [])

    const onUpdateTodoContent = useCallback(async (data: { todoId: string, content: string }) => {
        const { todoId, content } = data
        if (!content) {
            alert("Todo content should not empty")
            return
        }
        const resp = await Service.updateTodo({
            todoId: todoId,
            content: content
        })
        if (resp.status === "success") {
            dispatch(updateTodoContent(todoId, content))
        } else {
            console.log(resp.message)
        }
    }, [])

    const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (todos && todos?.length > 0) {
            const checked = e.target.checked
            await Promise.all(todos.map(todo =>
                Service.updateTodo({
                    todoId: todo.id,
                    status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
                })
            ));
            dispatch(toggleAllTodos(checked))
        }
    }

    const onDeleteTodo = useCallback(async (todoId: string) => {
        const resp = await Service.deleteTodo(todoId)
        if (resp.status === 'success') {
            dispatch(deleteTodo(todoId))
        } else {
            console.log(resp.message)
        }
    }, [])

    const onDeleteAllTodo = useCallback( async () => {
        if (todos && todos?.length > 0) {
            await Promise.all(todos.map(todo =>
                Service.deleteTodo(todo.id)
            ))
            dispatch(deleteAllTodos());
        }
    }, [todos])

    const handleTabChange = useCallback((tab: EnhanceTodoStatus) => {
        setShowing(tab)
    }, [])

    const showTodos = useMemo(() => {
        return todos.filter((todo) => {
            switch (showing) {
                case TodoStatus.ACTIVE:
                    return todo.status === TodoStatus.ACTIVE;
                case TodoStatus.COMPLETED:
                    return todo.status === TodoStatus.COMPLETED;
                default:
                    return true;
            }
        });
    }, [todos, showing])

    const activeTodos = useMemo(() => {
        return todos.reduce(function (accum, todo) {
            return isTodoCompleted(todo) ? accum : accum + 1;
        }, 0);
    }, [todos])

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <Input
                    ref={inputRef}
                    className="Todo__input"
                    name="todoInput"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <TodoList
                todoList={showTodos}
                onDeleteTodo={onDeleteTodo}
                onUpdateTodoStatus={onUpdateTodoStatus}
                onUpdateTodoContent={onUpdateTodoContent}
            />
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : null
                }
                <TodoTabs
                    onChange={handleTabChange}
                    value={showing}
                />
                <Button onClick={onDeleteAllTodo}>
                    Clear all todos
                </Button>
            </div>
        </div>
    );
};

export default ToDoPage;