import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";
import { isTodoCompleted } from "./utils";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const [toggle, setToggle] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/");
    }
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, [history]);

  const onChangeInput =
    (todoId?: string) => async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        e.key === "Enter" &&
        inputRef.current &&
        inputRef.current.value !== "" // reject null value can create an element
      ) {
        try {
          if (todoId) {
            //check have todoid will be editting todo
            dispatch(updateTodo(todoId, inputRef.current.value));
            setToggle("");
          } else {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = "";
          }
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

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <div className="container" onClick={() => setToggle("")}>
      <button onClick={logout}>Log out</button>
      <div className="wrapper">
        <div className="center">
          <input
            ref={inputRef}
            placeholder="What need to be done?"
            onKeyDown={onChangeInput()}
            type="text"
            aria-label="todo-input"
          />
        </div>
        <table className="table">
          <tbody>
            {showTodos.length > 0 ? (
              showTodos.map((todo) => {
                return (
                  <tr key={todo.id} className="row">
                    <td className="cell" style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={isTodoCompleted(todo)}
                        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                      />
                    </td>
                    <td colSpan={3} className="cell">
                      {toggle !== todo.id ? (
                        <p
                          aria-label={todo.content}
                          onDoubleClick={() => setToggle(todo.id)}
                        >
                          {todo.content}
                        </p>
                      ) : (
                        <input
                          ref={inputRef}
                          style={{ margin: 0, height: 51 }}
                          type="text"
                          defaultValue={todo.content}
                          onKeyDown={onChangeInput(todo.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </td>
                    <td className="cell" style={{ textAlign: "center" }}>
                      <button
                        style={{ width: "auto", background: "#ff4d4f", borderRadius: 60 }}
                        onClick={() => dispatch(deleteTodo(todo.id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="row">
                <td colSpan={5} className="cell empty">
                  Empty data
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="row">
              <td
                className="cell"
                style={{ textAlign: "center", width: "10%" }}
              >
                {todos.length > 0 ? (
                  <input
                    type="checkbox"
                    checked={activeTodos === 0}
                    onChange={onToggleAllTodo}
                  />
                ) : (
                  <div />
                )}
              </td>
              <td
                className="cell"
                style={{ textAlign: "center", width: "20%" }}
              >
                <button
                  style={{ borderRadius: 60 }}
                  onClick={() => setShowing("ALL")}
                >
                  All
                </button>
              </td>
              <td
                className="cell"
                style={{ textAlign: "center", width: "20%" }}
              >
                <button
                  style={{ borderRadius: 60 }}
                  onClick={() => setShowing(TodoStatus.ACTIVE)}
                >
                  Active
                </button>
              </td>
              <td
                className="cell"
                style={{ textAlign: "center", width: "20%" }}
              >
                <button
                  style={{ borderRadius: 60 }}
                  onClick={() => setShowing(TodoStatus.COMPLETED)}
                >
                  Completed
                </button>
              </td>
              <td
                className="cell"
                style={{ textAlign: "center", width: "30%" }}
              >
                <button style={{ borderRadius: 60 }} onClick={onDeleteAllTodo}>
                  Clear all todos
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ToDoPage;
