import React, { useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../auth/useUser";
import { Button, Tags } from "../components";

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
import { isTodoCompleted } from "../utils";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const history = useHistory();
  const user = useUser();
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // (async () => {
    //   const resp = await Service.getTodos();

    //   dispatch(setTodos(resp || []));
    // })();

    const loadTodos = async () => {
      try {
        const resp = await Service.getTodos();

        dispatch(setTodos(resp || []));
      } catch (error) {
        setErrorMessage(error);
      }
    };

    loadTodos();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("key enter");
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

  const onUpdateTodoStatus = (
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

  return (
    <div className="content-container">
      <h1>TodoMatic for {user.name}</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyUpCapture={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <button
                className="Todo__delete"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : null}
        <div className="Todo__tagsList">
          <Tags text="All" />
          <Tags text="Active" />
          <Tags text="Completed" />
          {/* <button className="Action__btn" onClick={() => setShowing("ALL")}>
            All
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button> */}
        </div>
        <Button
          classNames="btn btn-danger"
          onClick={onDeleteAllTodo}
          text="Clear all todos"
        />
      </div>
    </div>
  );
};

export default ToDoPage;
