import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "../store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteTodo,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoContent,
} from "../store/actions";
import Service from "../service";
import { TodoStatus } from "../models/todo";

import TrashIcon from "../images/trash.svg";
import CheckIcon from "../images/check.svg";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [onEdit, setOnEdit] = useState<number>(-1);
  const [newText, setNewText] = useState<string>("");
  const inputRef = useRef<any>(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputRef.current.value.trim() !== "" && e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
    console.log(todoId);
  };

  const onEditTodo = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: any
  ) => {
    if (e.key === "Enter") {
      dispatch(updateTodoContent(todoId, newText));
      setOnEdit(-1);
    }
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteTodo = (todoId: any) => {
    dispatch(deleteTodo(todoId));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className="Todo__page">
      <div className="Todo__creation">
        <p className="Todo__creation--text">Create a task:</p>
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What needs to be done?"
          onKeyDown={(e) => onCreateTodo(e)}
        />
      </div>
      <div className="ToDo__container">
        <div className="Todo__toolbar">
          {todos.length !== 0 ? (
            // <input type="checkbox" onChange={onToggleAllTodo} />
            <>
              <input
                id="toggleAll"
                className="visually-hidden"
                type="checkbox"
                onChange={onToggleAllTodo}
              />
              <label className="Todo__complete" htmlFor="toggleAll">
                <img src={CheckIcon} alt="Complete todo" />
              </label>
            </>
          ) : (
            <div />
          )}
          <div className="Todo__tabs">
            <button
              className={`Action__btn ${
                showing === "ALL" ? "Action__btn--all" : ""
              }`}
              onClick={() => setShowing("ALL")}
            >
              All
            </button>
            <button
              className={`Action__btn ${
                showing === "ACTIVE" ? "Action__btn--active" : ""
              }`}
              onClick={() => setShowing(TodoStatus.ACTIVE)}
            >
              Active
            </button>
            <button
              className={`Action__btn ${
                showing === "COMPLETED" ? "Action__btn--completed" : ""
              }`}
              onClick={() => setShowing(TodoStatus.COMPLETED)}
            >
              Completed
            </button>
          </div>
          <button className="Action__btn" onClick={onDeleteAllTodo}>
            Clear all todos
          </button>
        </div>
        <div className="ToDo__list">
          {todos.length !== 0 ? (
            todos.map((todo, index) => {
              if (todo.status === showing || showing === "ALL") {
                return (
                  <div
                    key={index}
                    className={`ToDo__item ToDo__item${
                      todo.status === TodoStatus.COMPLETED
                        ? "--completed"
                        : "--active"
                    }`}
                  >
                    <div
                      className="Todo__title--container"
                      onDoubleClick={() => setOnEdit(index)}
                    >
                      {onEdit === index ? (
                        <input
                          autoFocus
                          onChange={(e) => {
                            setNewText(e.target.value);
                          }}
                          onBlur={() => {
                            setOnEdit(-1);
                          }}
                          onKeyDown={(e) => {
                            onEditTodo(e, todo.id);
                          }}
                          type="text"
                          className="Todo__title"
                        />
                      ) : (
                        <span className="Todo__title">{todo.content}</span>
                      )}
                    </div>
                    <span className="Todo__date">
                      {todo.created_date.substring(0, 10)}
                    </span>
                    <input
                      id={todo.id}
                      className="toggle visually-hidden"
                      type="checkbox"
                      checked={todo.status === TodoStatus.COMPLETED}
                      onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                    />
                    <label className="Todo__complete" htmlFor={todo.id}>
                      <img src={CheckIcon} alt="Complete todo" />
                    </label>
                    <button
                      className="Todo__delete"
                      onClick={() => onDeleteTodo(todo.id)}
                    >
                      <img src={TrashIcon} alt="Delete todo" />
                    </button>
                  </div>
                );
              }
            })
          ) : (
            <div className="Todo__empty">
              <h4>Add your very first task!</h4>
              <div className="Todo__instructions">
                <p>✍ Enter your task on the field above</p>
                <p>💻 Press 'Enter' to save your task</p>
                <p>Your task/s should appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
