import React, { useEffect, useReducer, useRef, useState, useMemo, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from 'root/store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoContent
} from 'root/store/actions';
import Service from 'root/service';
import { TodoStatus, EnhanceTodoStatus, TodoStatusExtend } from 'root/models/todo';
import { isTodoCompleted } from 'root/utils';
import TodoPresentation from './presentation';

import './_todo.css'

const TodoComponent = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>(TodoStatusExtend.ALL);
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
        //improve UX, user does not need to click into the input again to add todo
        inputRef.current.focus()
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/')
        }
      }
    }
  }, [dispatch, history])

  const onUpdateTodoStatus: Function = useCallback(async (todoId: string, value: boolean) => {
    try {
      await Service.updateTodoStatus(todoId, value);
      dispatch(updateTodoStatus(todoId, value));
    } catch (error) {
      if (error?.response?.status === 401) {
        history.push('/')
      }
    }
  }, [dispatch])

  const onToggleAllTodo = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
    try {
      e.persist()
      const checked = e.target.checked
      await Service.toggleAllTodos(checked)
      dispatch(toggleAllTodos(checked))
    } catch (error) {
      if (error?.response?.status === 401) {
        history.push('/')
      }
    }
  }, [dispatch])

  const onDeleteAllTodo = useCallback(async () => {
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
    try {
      await Service.deleteAllTodo()
      dispatch(deleteAllTodos());
    } catch (error) {
      if (error?.response?.status === 401) {
        history.push('/')
      }
    }
  }, [dispatch])

  const handleDeleteTodo = useCallback(async (todoId: string) => {
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
    try {
      await Service.deleteTodo(todoId)
      dispatch(deleteTodo(todoId));
    } catch (error) {
      if (error?.response?.status === 401) {
        history.push('/')
      }
    }
  }, [dispatch])

  const handleUpdateTodoContent = useCallback(async (todoId: string, content: string) => {
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
    try {
      await Service.updateTodoContent(todoId, content)
      dispatch(updateTodoContent(todoId, content));
    } catch (error) {
      if (error?.response?.status === 401) {
        history.push('/')
      }
    }
  }, [dispatch])

  const handleShowingAll = useCallback(() => {
    /**
     * reduce rebinding function. Does not rebind when dependencies has not changed
     */
    setShowing(TodoStatusExtend.ALL)
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

  const showTodos = useMemo(() => todos.filter((todo) => {
    /**
     * Reduce recalculating showing todos, Does not recalculate showing todos when todos and showing state have not changed
     */
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      case TodoStatusExtend.ALL:
      default:
        return true
    }
  }), [showing, todos])
  
  const prevCountRef = useRef(showTodos.length)
  const prevCount = prevCountRef.current

  useEffect(() => {
    prevCountRef.current = showTodos.length
    if (todos.length > 0) {
      const lastItem = document.getElementById(`todo-item-${todos[todos.length - 1].id}`)
      if (lastItem && prevCount !== showTodos.length) setTimeout(() => {
        lastItem.scrollIntoView({ block: 'end',  behavior: 'smooth' })
      }, 401) // delay to wait for css animation work first
    }
  }, [showTodos])

  const activeTodos = useMemo(() => todos.reduce(function (accum, todo) {
    /**
     * Reduce recalculating activeTodos, Does not recalculate active todos when todos has not changed
    */
    return isTodoCompleted(todo) ? accum : accum + 1
  }, 0), [todos])

  return (
    <TodoPresentation
      inputRef={inputRef}
      onCreateTodo={onCreateTodo}
      showTodos={showTodos}
      onUpdateTodoStatus={onUpdateTodoStatus}
      deleteTodo={handleDeleteTodo}
      todos={todos}
      activeTodos={activeTodos}
      onToggleAllTodo={onToggleAllTodo}
      handleShowingAll={handleShowingAll}
      handleShowingActive={handleShowingActive}
      handleShowingCompleted={handleShowingCompleted}
      onDeleteAllTodo={onDeleteAllTodo}
      onUpdateTodoContent={handleUpdateTodoContent}
      showing={showing}
    />
  )
}

export default TodoComponent