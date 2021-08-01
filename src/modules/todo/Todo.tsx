import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import TodoAction from "./todo-action/TodoAction";
import TodoList from "./todo-list/TodoList";
import useTodoReducer from "./store";
import { TodoStatus } from "./store/todo.constant";

import { TodoContext } from "./TodoContext";
import './styles.scss'
import TodoFilter from "./todo-toolbar/TodoToolbar";
type EnhanceTodoStatus = TodoStatus | "ALL";

const ModuleTodo = () => {
  const [state, dispatch] = useTodoReducer();

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <main className="container">
        <article className="container__box">
          <h1>To-Do List</h1>
          <TodoAction />
          <TodoFilter />
          <TodoList />
        </article>
      </main>
    </TodoContext.Provider>
  );
};

export default ModuleTodo;
