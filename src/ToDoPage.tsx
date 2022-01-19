import React, { useEffect, useReducer, useRef, useState } from "react";
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
import "./ToDoPage.css";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  // update list upon change
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current && inputRef.current.value.trim()) {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onEditTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  // Added: Wait for Enter or Esc press to save or exit editing
  const exitEditMode = async (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
    if (e.key === "Enter" || e.key === "Escape") {
      if (e.key === "Enter") dispatch(updateTodoContent(todoId, content)); // save if enter key was pressed
      setActiveInput(null);
      e.preventDefault();
      e.stopPropagation();
    }
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
    <div className="ToDo__container">
      <div className="ToDo__creation">
        <input ref={inputRef} className="ToDo__input" placeholder="What needs to be done?" onKeyDown={onCreateTodo} />
      </div>
      <div className="ToDo__card">
        <div className="ToDo__list flex flex-col">
          {showTodos.length > 0 ? (
            showTodos
              .slice(0)
              .reverse()
              .map((todo, index) => {
                return (
                  <div key={index} className="flex">
                    {activeInput === index ? (
                      <input
                        className="ToDo__item"
                        type="text"
                        value={content}
                        onKeyDown={(e) => exitEditMode(e, todo.id)}
                        onChange={onEditTodo}
                        onBlur={() => {
                          setActiveInput(null);
                        }}
                        autoFocus
                      />
                    ) : (
                      <div className="ToDo__item flex flex-row">
                        <span className="ToDo__priority"></span>
                        <input
                          type="checkbox"
                          checked={isTodoCompleted(todo)}
                          onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                        />
                        <div className="ToDo__content flex-grow">
                          <p
                            onDoubleClick={() => {
                              setActiveInput(index);
                              setContent(todo.content);
                            }}
                          >
                            {todo.content}
                          </p>
                        </div>
                        <button className="ToDo__delete" onClick={() => dispatch(deleteTodo(todo.id))}>
                          <svg className="svg-icon" viewBox="0 0 20 20">
                            <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
          ) : (
            <p className="ToDo__empty">No tasks here!</p>
          )}
        </div>
        <div className="ToDo__toolbar flex justify-between">
          {todos.length > 0 ? (
            <input type="checkbox" checked={activeTodos === 0} onChange={onToggleAllTodo} />
          ) : (
            <div />
          )}
          <button className="Action__btn ToDo__deleteAll" onClick={onDeleteAllTodo}>
            Delete all
          </button>
        </div>
      </div>

      <div className="ToDo__tabs flex flex-row justify-evenly">
        <button
          className={showing === "ALL" ? "Action__btn Active__tab" : "Action__btn"}
          onClick={() => setShowing("ALL")}
        >
          All
        </button>
        <button
          className={showing === TodoStatus.ACTIVE ? "Action__btn Active__tab" : "Action__btn"}
          onClick={() => setShowing(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={showing === TodoStatus.COMPLETED ? "Action__btn Active__tab" : "Action__btn"}
          onClick={() => setShowing(TodoStatus.COMPLETED)}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
