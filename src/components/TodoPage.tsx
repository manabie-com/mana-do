import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../store/AppProvider";
import { TodoStatus } from "../models/todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoToolBar from "./TodoToolBar";
import Service from "../service";
import { setTodos } from "../store/actions";

type EnhanceTodoStatus = TodoStatus | "ALL";

const TodoPage = () => {
  const {
    state: { todos },
    dispatch,
  } = useContext(AppContext);

  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ToDo__container" data-testid="todo-page">
      <h2 style={{ margin: "1rem 0 0" }}>Todo App</h2>
      <TodoForm />
      <TodoList todos={todos} showing={showing} />
      <TodoToolBar todos={todos} setShowing={setShowing} />
    </div>
  );
};

export default TodoPage;
