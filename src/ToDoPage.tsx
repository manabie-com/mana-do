import React, { useEffect, useReducer, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import { setTodos } from "./store/actions";
import Service from "./service";
import { EnhanceTodoStatus } from "./models/todo";
import { CreateTodo } from "./components/CreateTodo";
import { TodoList } from "./components/TodoList";
import { FilterTodos } from "./components/FilterTodos";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  return (
    <div className="ToDo__container">
      <CreateTodo dispatch={dispatch} />
      <TodoList dispatch={dispatch} todos={todos} showing={showing} />
      <FilterTodos todos={todos} dispatch={dispatch} setShowing={setShowing} showing={showing} />
    </div>
  );
};

export default ToDoPage;
