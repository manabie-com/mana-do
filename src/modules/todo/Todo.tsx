import React from "react";
import TodoAction from "./todo-action/TodoAction";
import TodoList from "./todo-list/TodoList";
import TodoToolbar from "./todo-toolbar/TodoToolbar";
import useTodoReducer from "./store";
import { TodoContext } from "./TodoContext";
import "./styles.scss";

const ModuleTodo = () => {
  const [state, dispatch] = useTodoReducer();

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <main className="container">
        <article className="container__box">
          <h1>To-Do List</h1>
          <TodoAction />
          <TodoToolbar />
          <TodoList />
        </article>
      </main>
    </TodoContext.Provider>
  );
};

export default ModuleTodo;
