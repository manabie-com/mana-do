import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import "./ToDoPage.scss";

import reducer, { initialState } from "../../store/reducer";
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateContentTodo,
} from "../../store/actions";
import Service from "../../service";
import { TodoStatus } from "../../constants/todo";
import { isTodoCompleted } from "../../utils";
import { useClickOutside } from "../../hooks";

type EnhanceTodoStatus = TodoStatus | "ALL";

export const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);

  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [editing, setEditing] = useState(-1);
  const [valueContent, setValueContent] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const outSideInput = useRef<HTMLInputElement>(null);

  //intital state
  useEffect(() => {
    // (async () => {

    //you can use localStorage instead of calling remote APIs

    // const resp = await Service.getTodos();

    const resp: Array<Todo> = JSON.parse(localStorage.getItem("todos") || "");
    dispatch(setTodos(resp || []));
    // })();
  }, []);

  // Anytime, when todos is update new state, this useffect will run to update localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //onCreateTodo
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

  //onUpdateTodoStatus
  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  //onToggleAllTodo
  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  //onDeleteAllTodo
  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  //showTodos
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

  // Handle Click outside to dicard
  const onClickOutside = () => setEditing(-1);
  useClickOutside(outSideInput, onClickOutside);

  // Handle change value content todo
  const handleChangeContentTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueContent(e.target.value);
  };

  // Handle Update Content Todo
  const handleUpdateContentTodo = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string
  ) => {
    if (e.key === "Enter") {
      dispatch(
        updateContentTodo({
          todoId,
          content: valueContent === null ? "" : valueContent,
        })
      );
      setEditing(-1);
      setValueContent(null);
    }
  };

  //activeTodos
  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo, index) => {
          return (
            <div
              key={index}
              className="ToDo__item"
              onDoubleClick={() => {
                setEditing(index);
              }}
            >
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              {editing === index ? (
                <input
                  value={valueContent === null ? todo.content : valueContent}
                  ref={outSideInput}
                  onChange={handleChangeContentTodo}
                  onKeyDown={(e) => handleUpdateContentTodo(e, todo.id)}
                />
              ) : (
                <span>{todo.content}</span>
              )}
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
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button className="Action__btn" onClick={() => setShowing("ALL")}>
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
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};
