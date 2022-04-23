import React, { useReducer } from "react";

import reducer, { initialState } from "store/reducer";
import { TodoStatus } from "types";
import { TodoInput, TodoList, TodoFilter } from "components";

import styles from "./Todo.module.scss";

const ToDoPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { todos, filter } = state;

  console.log({
    todos,
    filter,
  });

  const onAddTodo = (value: string) => {
    dispatch({
      type: "CREATE_TODO",
      payload: value,
    });
  };

  const onChangeFilter = (filter: TodoStatus) => {
    dispatch({ type: "CHANGE_FILTER", payload: filter });
  };

  const onClearTodos = () => {
    dispatch({ type: "CLEAR_TODOS" });
  };

  const unCompletedTodos = todos.filter((todo) => !todo.completed);
  const renderTodos =
    filter === TodoStatus.ALL
      ? todos
      : filter === TodoStatus.ACTIVE
      ? unCompletedTodos
      : todos.filter((todo) => todo.completed);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>todos</h1>
      <div className={styles.main}>
        <TodoInput addTodo={onAddTodo} />
        <TodoList todos={renderTodos} dispatch={dispatch} />
        <TodoFilter
          unCompleteNumber={unCompletedTodos.length}
          filter={filter}
          changeFilter={onChangeFilter}
          clearTodos={onClearTodos}
        />
      </div>
    </div>
  );
};

export default ToDoPage;
