import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import reducer, { initialState } from "../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from "../store/actions";
import Service from "../service";
import { TodoStatus } from "../models/todo";
import { getStorage, isTodoCompleted } from "../utils";
import ToDoList from "../components/ToDo/list";
import TodoTabs from "../components/ToDo/tabs";
import ToDoToolbar from "../components/ToDo/toolbar";
import ToDoSearch from "../components/ToDo/search";
import { TODO_STORAGE } from "../utils/constants";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      setLoading(true)
      const resp = await Service.getTodos();
      setLoading(false)

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = "";
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  const onUpdateTodoStatus = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const handleSubmit = () => {
    dispatch(setTodos(todos || []));
  };

  const handleReset = () => {
    const todo = getStorage(TODO_STORAGE);
    dispatch(setTodos(todo || []));
  };

  return (
    <div className="ToDo__container">
      <ToDoSearch onCreateTodo={onCreateTodo} inputRef={inputRef} />
      <TodoTabs setShowing={setShowing} todos={todos} />
      <ToDoToolbar
        activeTodos={activeTodos}
        todos={todos}
        onToggleAllTodo={(e) => onToggleAllTodo(e)}
        onDeleteAllTodo={onDeleteAllTodo}
      />
      {!loading ? (
        <ToDoList
          showTodos={showTodos}
          isTodoCompleted={isTodoCompleted}
          onUpdateTodoStatus={onUpdateTodoStatus}
          onDeleteTodo={onDeleteTodo}
        />
      ) : (
        "Loading..."
      )}
      <div className="Todo__control_btn">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default ToDoPage;
