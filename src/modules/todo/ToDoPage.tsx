/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import useTodoReducer from './store';
import { TodoContext } from './ToDoContext';
import ToDoCreation from './ToDoCreation';
import ToDoListItem from './ToDoListItem';
import ToDoToolbar from './ToDoToolbar';
import { TodoStatus } from '../../models/todo';
import { setTodos } from './store/actions';
import './todo.scss';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [state, dispatch] = useTodoReducer();

  useEffect(() => {
    dispatch(setTodos());
  }, [])

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <div className="ToDo__container">
        <h1>Todo</h1>
        <ToDoCreation></ToDoCreation>
        <ToDoListItem showing={showing}></ToDoListItem>
        <ToDoToolbar showing={showing} setShowing={setShowing}></ToDoToolbar>
      </div>
    </TodoContext.Provider>
  );
};

export default ToDoPage;