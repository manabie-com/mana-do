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

import './_todo.css'

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
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
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
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
    dispatch(toggleAllTodos(e.target.checked))
  }, [dispatch, toggleAllTodos])

  const onDeleteAllTodo = useCallback(() => {
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
    dispatch(deleteAllTodos());
  }, [dispatch, deleteAllTodos])

  const handleDeleteTodo = useCallback((todoId: string) => {
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
    dispatch(deleteTodo(todoId));
  }, [dispatch, deleteTodo])

  const handleShowingAll = useCallback(() => {
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
    setShowing('ALL')
  }, [setShowing])

  const handleShowingActive = useCallback(() => {
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
    setShowing(TodoStatus.ACTIVE)
  }, [setShowing])

  const handleShowingCompleted = useCallback(() => {
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
    setShowing(TodoStatus.COMPLETED)
  }, [setShowing])

  const getShowTodos = useCallback(() => todos.filter((todo) => {
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
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
    /**
     * Reduce re-calculating activeTodos, Does not recalculate active todos when todos has not changed
    */
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