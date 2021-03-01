import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactRouter, { RouteComponentProps } from "react-router-dom";
import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { isTodoCompleted } from "./utils";
import "./css/todoList.css";
type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps<{}>) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [toggle, setToggle] = useState(true);
  const [text, setText] = useState("input");

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const signOut = () => {
    // e.preventDefault();
    // const resp = await Service.signIn(form.userId, form.password);

    // localStorage.setItem("token", resp);
    history.push("/todo");
  };

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current?.value.trim()) {
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

  const onUpdateTodoContent = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string
  ) => {
    if (
      (e.key === "Enter" && inputRef2.current?.value.trim()) ||
      (e.key === "Escape" && inputRef2.current?.value.trim())
    ) {
      dispatch(updateTodoContent(todoId, inputRef2.current.value));
      setToggle(true);
      e.preventDefault();
      e.stopPropagation();
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
    <div className="webContainer">
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <a className="navbar-brand" href="#">
          Todo Application
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="/">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="ToDo__container container">
        {/* Input-form */}
        <div
          className="Todo__creation validate-input validate-form"
          data-validate="This field must not be null"
        >
          <input
            ref={inputRef}
            className="Todo__input form-control input"
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
          />
        </div>
        {/* Filter */}
        <div className="Todo__toolbar">
          <div className="Todo__tabs">
            <button
              className="Action__btn btn btn-secondary"
              onClick={() => setShowing("ALL")}
            >
              All{" "}
              <span className="badge badge-pill badge-secondary">
                {todos.length}
              </span>
            </button>
            <button
              className="Action__btn btn btn-primary"
              onClick={() => setShowing(TodoStatus.ACTIVE)}
            >
              Active&nbsp;
              <span className="badge badge-pill badge-secondary">
                {
                  todos.filter((item) => item.status === TodoStatus.ACTIVE)
                    .length
                }
              </span>
            </button>
            <button
              className="Action__btn btn btn-success"
              onClick={() => setShowing(TodoStatus.COMPLETED)}
            >
              Completed&nbsp;
              <span className="badge badge-pill badge-secondary">
                {
                  todos.filter((item) => item.status === TodoStatus.COMPLETED)
                    .length
                }
              </span>
            </button>
          </div>
          <button
            className="Action__btn btn btn-danger"
            onClick={onDeleteAllTodo}
          >
            Clear all todos
          </button>
        </div>
        <br />
        {/* List of Todos*/}
        <div className="table table-custom-ui m-b-110">
          <div className="table-head">
            <table>
              <thead>
                {todos.length > 0 ? (
                  <tr className="row head">
                    <th className="column-first th-custom">Content</th>
                    <th className="column-middle-short th-custom">Status</th>
                    <th className="column-middle-long th-custom">
                      <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                      />
                    </th>

                    <th className="column-last" th-custom>
                      Delete Task
                    </th>
                  </tr>
                ) : (
                  <tr className="row head">
                    <th
                      className="column-first"
                      style={{
                        width: "50%",
                        paddingTop: "18px",
                        paddingBottom: "18px",
                      }}
                    >
                      Content
                    </th>
                    <th
                      className="column-middle-short"
                      style={{
                        width: "50%",
                        paddingTop: "18px",
                        paddingBottom: "18px",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                )}
              </thead>
            </table>
          </div>

          {showTodos.map((todo, index) => {
            return (
              <div key={index} className="table-body">
                <table>
                  <tbody>
                    <tr className="row body">
                      <td className="column-first">
                        {toggle ? (
                          <p
                            onDoubleClick={() => {
                              setToggle(false);
                            }}
                          >
                            {todo.content}
                          </p>
                        ) : (
                          <input
                            ref={inputRef2}
                            type="text"
                            style={{ width: "81%" }}
                            placeholder={todo.content}
                            onKeyDown={(e) => onUpdateTodoContent(e, todo.id)}
                          />
                        )}
                      </td>
                      <td className="column-middle-short">
                        {todo.status === TodoStatus.ACTIVE ? (
                          <span className="badge badge-pill btn-primary">
                            Active
                          </span>
                        ) : (
                          <span className="badge badge-pill btn-success">
                            Completed
                          </span>
                        )}
                      </td>
                      <td className="column-middle-long">
                        <input
                          type="checkbox"
                          checked={isTodoCompleted(todo)}
                          onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                        />
                      </td>
                      <td className="column-last">
                        <button
                          className="Action__btn btn btn-danger"
                          onClick={() => dispatch(deleteTodo(todo.id))}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
