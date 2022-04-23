import React from "react";

import reducer, { Actions, initialState, AppState } from "store/reducer";
import { TodoStatus } from "types";
import { TodoInput, TodoList, TodoFilter } from "components";

import { useLocalStorageReducer } from "hooks";

import styles from "./Todo.module.scss";

const ToDoPage = () => {
  const [state, dispatch] = useLocalStorageReducer<AppState, Actions>(
    "todosApp",
    initialState,
    reducer
  );

  const { todos = [], filter = TodoStatus.ALL } = state;

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

  const unCompletedTodos = todos?.filter((todo) => !todo.completed);
  const renderTodos =
    filter === TodoStatus.ALL
      ? todos
      : filter === TodoStatus.ACTIVE
      ? unCompletedTodos
      : todos.filter((todo) => todo.completed);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>todos</h1>
      <div className={styles.main} data-cy="main">
        <TodoInput addTodo={onAddTodo} />
        <TodoList todos={renderTodos} dispatch={dispatch} />
        <TodoFilter
          unCompleteNumber={unCompletedTodos?.length || 0}
          filter={filter}
          changeFilter={onChangeFilter}
          clearTodos={onClearTodos}
        />
      </div>
      <p className={styles.note}>Double-click to edit a todo</p>
    </div>
  );
};

export default ToDoPage;
