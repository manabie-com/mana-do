import React, { useEffect, useContext } from 'react';
import {
  setTodos,
} from 'store/actions';
import { Header } from 'components/Header';
import { TodoList } from 'components/TodoList';
import { Toolbar } from 'components/Toolbar';
import './ToDoPage.scss';
import { TodoContext } from 'App';

export const ToDoPage = () => {
  const { todos, dispatch } = useContext(TodoContext);

  useEffect(() => {
    const resp = localStorage.getItem("todos");
    if (resp) {
      dispatch(setTodos(JSON.parse(resp)));
    } else {
      dispatch(setTodos([]));
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <h1>Todos</h1>
      <div className="Todo">
        <Header />
        <TodoList />
        <Toolbar />
      </div>
    </>
  );
};
