import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from "store/actions";
import Service from "service";
import { TodoStatus } from "types";
import { TodoInput, TodoList, TodoFilter } from "components";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className="ToDo__container">
      <TodoInput />
      <TodoList />
      <TodoFilter />
    </div>
  );
};

export default ToDoPage;
