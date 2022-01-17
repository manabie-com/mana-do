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
      <div className="Todo__creation">
        <input ref={inputRef} className="Todo__input" placeholder="What need to be done?" onKeyDown={onCreateTodo} />
      </div>
      <div className="ToDo__list">
        {showTodos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input type="checkbox" checked={isTodoCompleted(todo)} onChange={(e) => onUpdateTodoStatus(e, todo.id)} />
              {activeInput === index ? (
                <input
                  type="text"
                  value={content}
                  onKeyDown={(e) => exitEditMode(e, todo.id)}
                  onChange={onEditTodo}
                  autoFocus
                />
              ) : (
                <p
                  onDoubleClick={() => {
                    setActiveInput(index);
                    setContent(todo.content);
                  }}
                >
                  {todo.content}
                </p>
              )}
              <button className="Todo__delete" onClick={() => dispatch(deleteTodo(todo.id))}>
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? <input type="checkbox" checked={activeTodos === 0} onChange={onToggleAllTodo} /> : <div />}
        <div className="Todo__tabs">
          <button className="Action__btn" onClick={() => setShowing("ALL")}>
            All
          </button>
          <button className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
            Active
          </button>
          <button className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
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
