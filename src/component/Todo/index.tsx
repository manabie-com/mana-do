import React, { useEffect, useReducer, useState } from "react";
import reducer, { initialState } from "store/reducer";
import { setTodos } from "store/actions";
import { TodoStatus } from "models/todo";
import { isTodoCompleted } from "utils";
import TodoForm from "component/Todo/Form";
import TodoList from "component/Todo/List";
import TodoToolbar from "component/Todo/Toolbar";
import {
  persistTodosToLocalStorage,
  retrieveTodosFromLocalStorage,
} from "utils/localStorage";
import FilterButtons from "./FilterButtons";

export type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");

  useEffect(() => {
    const todosInStorage = retrieveTodosFromLocalStorage();
    if (todosInStorage.length > 0) {
      dispatch(setTodos(todosInStorage));
    }
  }, []);

  useEffect(() => {
    persistTodosToLocalStorage(todos);
  }, [todos]);

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const renderTodoCount = (): number => todos.length;

  return (
    <div data-testid="todo-container" className="todo__container">
      <div className="heading">
        <h1 className="heading__title">To-Dos</h1>
        {renderTodoCount() > 0 && (
          <span className="heading__count">{renderTodoCount()}</span>
        )}
      </div>
      <FilterButtons showing={showing} setShowing={setShowing} />

      <TodoForm dispatch={dispatch} />
      <TodoList dispatch={dispatch} todos={todos} showing={showing} />
      <TodoToolbar
        hasTodo={todos && !!todos.length}
        activeTodos={activeTodos}
        dispatch={dispatch}
      />
    </div>
  );
};

export default ToDoPage;
