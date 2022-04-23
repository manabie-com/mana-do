import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "store/reducer";
import {
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from "store/actions";
import Service from "service";
import { TodoStatus } from "types";
import { TodoInput, TodoList, TodoFilter } from "components";

import styles from "./Todo.module.scss";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);

  const { todos } = state;

  console.log({
    todos,
  });

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
    <div className={styles.container}>
      <h1 className={styles.heading}>todos</h1>
      <div className={styles.main}>
        <TodoInput />
        <TodoList />
        <TodoFilter />
      </div>
    </div>
  );
};

export default ToDoPage;
