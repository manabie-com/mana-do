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
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";
import { isTodoCompleted } from "./utils";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputTodoRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

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

  const onUpdateTodoContent = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    todoId: string
  ) => {
    if (e.key === "Enter") {
      console.log((inputTodoRef.current[index] as HTMLInputElement).value);
      const todoContent = (inputTodoRef.current[index] as HTMLInputElement)
        .value;
      setActiveIndex(null);
      dispatch(updateTodoContent(todoId, todoContent));
    }
  };

  const handleDoubleClick = async (id: number) => {
    setActiveIndex(id);
  };

  useEffect(() => {
    if (activeIndex !== null) {
      inputTodoRef.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

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
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              {activeIndex === index ? (
                <input
                  type="text"
                  ref={(el) => (inputTodoRef.current[index] = el)}
                  defaultValue={todo.content}
                  onKeyDown={(e) => onUpdateTodoContent(e, index, todo.id)}
                  onBlur={() => setActiveIndex(null)}
                />
              ) : (
                <span onDoubleClick={() => handleDoubleClick(index)}>
                  {todo.content}
                </span>
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
          <button
            className={`Action__btn ${showing === "ALL" ? "active" : ""}`}
            onClick={() => setShowing("ALL")}
          >
            All
          </button>
          <button
            className={`Action__btn ${showing === "ACTIVE" ? "active" : ""}`}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`Action__btn ${showing === "COMPLETED" ? "active" : ""}`}
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

export default ToDoPage;
