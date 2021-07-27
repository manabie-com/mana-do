import React, { useEffect, useReducer, useRef, useState, useMemo, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from 'root/store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus
} from 'root/store/actions';
import Service from 'root/service';
import { TodoStatus } from 'root/models/todo';
import { isTodoCompleted } from 'root/utils';
import TodoPresentation from './presentation';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const TodoComponent = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })()
  }, [])

  const onCreateTodo = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  }, [Service.createTodo, dispatch, createTodo])

  const onUpdateTodoStatus: Function = useCallback((e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  }, [dispatch, updateTodoStatus])

  const onToggleAllTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }, [dispatch, toggleAllTodos])

  const onDeleteAllTodo = useCallback(() => {
    dispatch(deleteAllTodos());
  }, [dispatch, deleteAllTodos])

  const handleDeleteTodo = useCallback((todoId: string) => {
    dispatch(deleteTodo(todoId));
  }, [dispatch, deleteTodo])

  const handleShowingAll = useCallback(() => {
    setShowing('ALL')
  }, [setShowing])

  const handleShowingActive = useCallback(() => {
    setShowing(TodoStatus.ACTIVE)
  }, [setShowing])

  const handleShowingCompleted = useCallback(() => {
    setShowing(TodoStatus.COMPLETED)
  }, [setShowing])

  const getShowTodos = useCallback(() => todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  }), [showing, todos])

  const activeTodos = useMemo(() => todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0), [todos])

  return (
    <TodoPresentation
      inputRef={inputRef}
      onCreateTodo={onCreateTodo}
      showTodos={getShowTodos()}
      onUpdateTodoStatus={onUpdateTodoStatus}
      deleteTodo={handleDeleteTodo}
      todos={todos}
      activeTodos={activeTodos}
      onToggleAllTodo={onToggleAllTodo}
      handleShowingAll={handleShowingAll}
      handleShowingActive={handleShowingActive}
      handleShowingCompleted={handleShowingCompleted}
      onDeleteAllTodo={onDeleteAllTodo}
    />
  );
};

export default TodoComponent;