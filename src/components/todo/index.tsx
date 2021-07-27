import React, { useEffect, useReducer, useRef, useState } from 'react';
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

  const onUpdateTodoStatus: Function = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  }

  const handleDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  }

  const handleShowingAll = () => {
    setShowing('ALL')
  }

  const handleShowingActive = () => {
    setShowing(TodoStatus.ACTIVE)
  }

  const handleShowingCompleted = () => {
    setShowing(TodoStatus.COMPLETED)
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
    />
  );
};

export default TodoComponent;