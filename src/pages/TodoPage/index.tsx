import React, { useEffect, useReducer, useRef, useState } from "react";
import "./index.css";

import reducer, { initialState } from "store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoContent,
  deleteTodo,
} from "store/actions";
import Service from "service";
import { TodoStatus } from "models/todo";
import { TodoInput, ToDoToolbar } from "components";

type EnhanceTodoStatus = TodoStatus | "ALL";

export const TodoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (content: string) => {
    const resp = await Service.createTodo(content);
    dispatch(createTodo(resp));
  };

  const onUpdateTodoStatus = (status: boolean, todoId: any) => {
    dispatch(updateTodoStatus(todoId, status));
  };

  const onToggleAllTodo = (status: boolean) => {
    dispatch(toggleAllTodos(status));
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onEditingTodo = (newContent: string, todoId: string) => {
    dispatch(updateTodoContent(todoId, newContent));
  };

  return (
    <div className="ToDo__container disable-select">
      <TodoInput inputRef={inputRef} _onCreateTodo={onCreateTodo} />

      <div className="legend-bar">
        <div className="legend-bar-item todo-color-active"></div>
        <div className="legend-bar-item todo-color-complete"></div>
      </div>

      <ToDoToolbar
        todoLength={todos.length}
        showing={showing}
        onToggleAllTodo={onToggleAllTodo}
        onDeleteAllTodo={onDeleteAllTodo}
        onSetShowing={setShowing}
      />
    </div>
  );
};
