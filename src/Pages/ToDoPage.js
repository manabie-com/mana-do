/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { AuthButtom, BaseInput, TodosToolBar, TodoItems } from "../Comps";
import { loginPath } from "../constant";
import Service from "../service";
import Context from "../store";
import { devidedTodos } from "../utils";

const ToDoPage = ({ history }) => {
  /**
   * get Store using Context
   */
  const propsContext = React.useContext(Context);
  const {
    state: { todos = [], content = "" },
    onChangeContent = () => {},
    createTodo = () => {},
    setTodos = () => {},
  } = propsContext;

  /**
   *
   * logics provided to create todo
   */
  const onCreateTodo = async (e) => {
    if (
      e.key === "Enter" &&
      typeof content === "string" &&
      content.length !== 0
    ) {
      try {
        const resp = await Service.createTodo(content);
        createTodo(resp);
      } catch (e) {
        if (e.response.status === 401) {
          history.push(loginPath);
        }
      }
    }
  };

  /**
   * logics provied to get data
   */
  const getData = async () => {
    const resp = await Service.getTodos();
    setTodos(resp || []);
  };

  /**
   * effect call data after first time render
   */
  React.useEffect(() => {
    getData();
  }, []);

  /**
   * Save todos in Local Store on Browser
   */
  React.useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todos));
  }, [todos]);

  const { todoActive = [], todoCompleted = [] } = devidedTodos(
    /* function prduces 2 array base on status */ todos
  );

  return (
    <div className="container">
      {/* Logout Btn */}
      <AuthButtom auth="logout" />
      {/* Input to Create Todo */}
      <BaseInput
        placeholder="What need to be done?"
        value={/* main content on Create */ content}
        onChange={(e) => {
          onChangeContent(e.target.value);
        }}
        onKeyDown={/* support save when user enter */ onCreateTodo}
      />
      {/* Toolbar go with todos list */}
      <TodosToolBar />
      {/* todo-lists */}
      <div>
        {/* todos are Actives show first  */}
        {todoActive.map((todo, index) => {
          return <TodoItems key={index} {...todo} />;
        })}
        {/* todos are Completed show last  */}
        {todoCompleted.map((todo, index) => {
          return <TodoItems key={index} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default ToDoPage;
